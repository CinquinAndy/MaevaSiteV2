/**
 * Applies the migrations of `src/migrations` before `next build` (see the "build" script in package.json).
 *
 * Run directly with tsx, not with `payload migrate` or `payload run`, because the Payload CLI:
 * - sometimes exits 0 without running anything (Node 22), which would let `next build` start on a non-migrated database;
 * - prompts on stdin (and hangs the build) when `payload_migrations` holds the "dev" row (batch -1) left by a
 *   `next dev` started against that database;
 * - fails when the `payload_migrations` table does not exist.
 *
 * BASELINE RULE. The old migrations do not build the schema the code expects today (the schema moved on through dev
 * pushes), and they are destructive (CREATE without guards, data copy, DROP TABLE ... CASCADE). So:
 * - on a database that already holds the application, a baseline migration is NEVER executed: when it is missing from
 *   `payload_migrations` it is recorded as already applied and skipped;
 * - on a truly empty database (fresh environment), every migration runs in order, baseline included. That alone does
 *   NOT give today's schema (the old migrations lag behind it): a new environment still needs a dev push;
 * - anything in between (some objects, but not the application tables) fails the build without touching anything.
 * Only migrations newer than the baseline ever run against a live database: keep them additive and idempotent
 * (ADD COLUMN IF NOT EXISTS, nullable), the previous build still serves the site on that database while this one builds.
 *
 * No prompt, the "dev" row is ignored and left as is, each migration runs in its own transaction and is recorded once.
 * Exit code 0 is only possible after the last log line ("Migrations applied: N" or "No migration to apply."); any
 * error or early exit is non-zero: the build stops and the previous container keeps serving the site.
 *
 * Good to know:
 * - `bun run build` therefore WRITES to the database DATABASE_URI points to (.env files included): never build locally
 *   with the production DATABASE_URI, and give preview deployments their own database.
 * - Each migration gets its own batch number. Never run `payload migrate:down` (or refresh, reset, fresh) on production.
 */
// Static imports only: a top-level `await import()` makes Node 22 exit with code 13 intermittently
import './load-env'
import config from '@payload-config'
import { type PostgresAdapter, sql } from '@payloadcms/db-postgres'
import {
	commitTransaction,
	createLocalReq,
	getPayload,
	initTransaction,
	killTransaction,
	type PayloadRequest,
} from 'payload'
import { migrations } from '../migrations'

// Never "push" the schema from this script, whatever NODE_ENV is
process.env.PAYLOAD_MIGRATING = 'true'

// Migrations that existed before the deploy step did. Explicit names, never inferred: do NOT add to this list.
const BASELINE_MIGRATIONS = ['20251021_230905_rename_date_to_published_date', '20251023_convert_galery_to_hasmany']

// Tables of the application at the baseline: all of them present = the database already holds the application.
const BASELINE_TABLES = [
	'users',
	'users_sessions',
	'media',
	'blog',
	'galery',
	'galery_rels',
	'services',
	'testimonials',
]

if (BASELINE_MIGRATIONS.some((name, index) => migrations[index]?.name !== name)) {
	throw new Error(`src/migrations/index.ts must start with the baseline migrations: ${BASELINE_MIGRATIONS.join(', ')}`)
}

// Without it node-postgres falls back on PG* variables or localhost: never migrate a database nobody named
if (!process.env.DATABASE_URI) {
	throw new Error('DATABASE_URI is not set: no migration, no build.')
}

// Payload drops the whole schema on connect when this is set, whatever NODE_ENV is: never from a build
if (process.env.PAYLOAD_DROP_DATABASE === 'true') {
	throw new Error('PAYLOAD_DROP_DATABASE is set: no migration, no build.')
}

const payload = await getPayload({ config, disableOnInit: true })
const adapter = payload.db as unknown as PostgresAdapter

type Transaction = PostgresAdapter['sessions'][string]['db']

// One transaction, never waiting long for a lock (and blocking the site behind it): better to fail and redeploy.
// The advisory lock serialises two simultaneous builds.
async function transaction(run: (db: Transaction, req: PayloadRequest) => Promise<void>): Promise<void> {
	const req = await createLocalReq({}, payload)
	await initTransaction(req)

	try {
		const db = adapter.sessions[String(await req.transactionID)].db

		await db.execute(sql`
      SET LOCAL lock_timeout = '3s';
      SELECT pg_advisory_xact_lock(hashtext('payload_migrations'));
    `)
		await run(db, req)
		await commitTransaction(req)
	} catch (err) {
		await killTransaction(req)
		throw err
	}
}

// Same definition as the one Payload generates (see the .json snapshots)
const createMigrationsTable = (db: Transaction) =>
	db.execute(sql`
    CREATE TABLE IF NOT EXISTS "payload_migrations" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar,
      "batch" numeric,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  `)

async function recorded(req: PayloadRequest) {
	const { docs } = await payload.find({ collection: 'payload-migrations', limit: 0, pagination: false, req })

	return {
		names: new Set(docs.map(doc => doc.name)),
		// One batch per migration (last + 1, the "dev" row in batch -1 does not count):
		// a `migrate:down` then only undoes the last migration, never the whole history at once
		nextBatch: Math.max(0, ...docs.map(doc => Number(doc.batch)).filter(Number.isFinite)) + 1,
	}
}

const record = (name: string, batch: number, req: PayloadRequest) =>
	payload.create({ collection: 'payload-migrations', data: { name, batch }, req })

let applied = 0

// Step 1, in ONE transaction: what is this database, and what becomes of the baseline migrations?
await transaction(async (db, req) => {
	// Everything a user can create, in every schema (extensions aside), and where unqualified names resolve
	const { rows: objects } = await db.execute<{ kind: string; name: string; visible: boolean }>(sql`
    SELECT c.relname AS name, c.relkind::text AS kind, pg_table_is_visible(c.oid) AS visible
    FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE c.relkind IN ('r', 'p', 'v', 'm', 'f', 'S')
      AND n.nspname <> 'information_schema' AND left(n.nspname, 3) <> 'pg_'
      AND NOT EXISTS (SELECT FROM pg_depend d WHERE d.classid = 'pg_class'::regclass AND d.objid = c.oid AND d.deptype = 'e')
    UNION ALL
    SELECT t.typname, 'enum', pg_type_is_visible(t.oid)
    FROM pg_type t JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typtype = 'e'
      AND n.nspname <> 'information_schema' AND left(n.nspname, 3) <> 'pg_'
      AND NOT EXISTS (SELECT FROM pg_depend d WHERE d.classid = 'pg_type'::regclass AND d.objid = t.oid AND d.deptype = 'e')
  `)

	const tables = objects.filter(object => object.visible && object.kind === 'r').map(object => object.name)
	const missing = BASELINE_TABLES.filter(table => !tables.includes(table))

	if (missing.length === 0) {
		// The application is there: its baseline migrations are recorded, NEVER executed
		await createMigrationsTable(db)
		let { names, nextBatch } = await recorded(req)

		for (const name of BASELINE_MIGRATIONS.filter(name => !names.has(name))) {
			payload.logger.info(`Baseline: ${name} recorded as already applied, NOT executed (existing database)`)
			await record(name, nextBatch++, req)
		}
	} else if (objects.length === 0) {
		// Nothing at all in this database, not even `payload_migrations`: fresh environment, the baseline builds the schema
		for (const [index, migration] of migrations.slice(0, BASELINE_MIGRATIONS.length).entries()) {
			payload.logger.info(`Empty database, migrating: ${migration.name}`)
			await migration.up({ db, payload, req })
			await createMigrationsTable(db)
			await record(migration.name, index + 1, req)
			applied++
		}
	} else {
		// Neither empty nor complete: no guess, nothing is executed nor recorded (the transaction is rolled back)
		throw new Error(
			`Database is not empty (${objects.length} tables, sequences, views or enums) but lacks: ${missing.join(', ')}. ` +
				'Refusing to run any migration: check DATABASE_URI and its search_path.'
		)
	}
})

// Step 2: the migrations newer than the baseline, each in its own transaction
for (const migration of migrations.slice(BASELINE_MIGRATIONS.length)) {
	await transaction(async (db, req) => {
		const { names, nextBatch } = await recorded(req)

		if (!names.has(migration.name)) {
			payload.logger.info(`Migrating: ${migration.name}`)
			await migration.up({ db, payload, req })
			await record(migration.name, nextBatch, req)
			applied++
		}
	})
}

payload.logger.info(applied ? `Migrations applied: ${applied}` : 'No migration to apply.')
await payload.destroy()
// Explicit exit, as the very last statement: without it the process stays alive and the build never ends
process.exit(0)
