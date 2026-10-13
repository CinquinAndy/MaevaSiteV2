import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

// Payload 3.86.0 -> 3.90.2: two columns added by Payload itself.
// - media._objectkey: `_objectKey` field of @payloadcms/plugin-cloud-storage (used by storage-s3)
// - users.reset_password_requested_at: `resetPasswordRequestedAt` auth field (forgotPassword.minRequestInterval)
// Nullable columns without default: no table rewrite, and the previous build keeps working on the migrated database.
// The .json snapshot is the full 3.90.2 schema, although this migration only holds the upgrade delta: the previous
// snapshot (20251021) was older than the schema in production, see src/scripts/migrate.ts.
export async function up({ db }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
		ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "reset_password_requested_at" timestamp(3) with time zone;
		ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "_objectkey" varchar;
	`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
	await db.execute(sql`
		ALTER TABLE "media" DROP COLUMN IF EXISTS "_objectkey";
		ALTER TABLE "users" DROP COLUMN IF EXISTS "reset_password_requested_at";
	`)
}
