import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
		-- Create the new galery_rels table for hasMany relationship
		CREATE TABLE IF NOT EXISTS "galery_rels" (
			"id" serial PRIMARY KEY NOT NULL,
			"order" integer,
			"parent_id" integer NOT NULL,
			"path" varchar NOT NULL,
			"media_id" integer
		);

		-- Migrate existing data from galery_images to galery_rels
		-- Preserving the order and parent relationships
		INSERT INTO "galery_rels" ("order", "parent_id", "path", "media_id")
		SELECT "_order", "_parent_id", 'images', "image_id"
		FROM "galery_images";

		-- Drop the old galery_images table and its constraints
		DROP TABLE IF EXISTS "galery_images" CASCADE;

		-- Add foreign key constraints to the new table
		ALTER TABLE "galery_rels" 
			ADD CONSTRAINT "galery_rels_parent_fk" 
			FOREIGN KEY ("parent_id") REFERENCES "galery"("id") 
			ON DELETE cascade ON UPDATE no action;

		ALTER TABLE "galery_rels" 
			ADD CONSTRAINT "galery_rels_media_fk" 
			FOREIGN KEY ("media_id") REFERENCES "media"("id") 
			ON DELETE cascade ON UPDATE no action;

		-- Create indexes for performance
		CREATE INDEX IF NOT EXISTS "galery_rels_order_idx" ON "galery_rels" USING btree ("order");
		CREATE INDEX IF NOT EXISTS "galery_rels_parent_idx" ON "galery_rels" USING btree ("parent_id");
		CREATE INDEX IF NOT EXISTS "galery_rels_path_idx" ON "galery_rels" USING btree ("path");
		CREATE INDEX IF NOT EXISTS "galery_rels_media_id_idx" ON "galery_rels" USING btree ("media_id");
	`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
	await db.execute(sql`
		-- Recreate the original galery_images table
		CREATE TABLE IF NOT EXISTS "galery_images" (
			"_order" integer NOT NULL,
			"_parent_id" integer NOT NULL,
			"id" varchar PRIMARY KEY NOT NULL,
			"image_id" integer NOT NULL,
			"caption" varchar
		);

		-- Migrate data back from galery_rels to galery_images
		-- Generate new UUIDs for the id field since we don't have the originals
		INSERT INTO "galery_images" ("_order", "_parent_id", "id", "image_id")
		SELECT 
			"order", 
			"parent_id", 
			'img_' || "id"::text,
			"media_id"
		FROM "galery_rels"
		WHERE "path" = 'images';

		-- Drop the galery_rels table
		DROP TABLE IF EXISTS "galery_rels" CASCADE;

		-- Recreate foreign keys and indexes for galery_images
		ALTER TABLE "galery_images" 
			ADD CONSTRAINT "galery_images_image_id_media_id_fk" 
			FOREIGN KEY ("image_id") REFERENCES "media"("id") 
			ON DELETE set null ON UPDATE no action;

		ALTER TABLE "galery_images" 
			ADD CONSTRAINT "galery_images_parent_id_fk" 
			FOREIGN KEY ("_parent_id") REFERENCES "galery"("id") 
			ON DELETE cascade ON UPDATE no action;

		CREATE INDEX IF NOT EXISTS "galery_images_order_idx" ON "galery_images" USING btree ("_order");
		CREATE INDEX IF NOT EXISTS "galery_images_parent_id_idx" ON "galery_images" USING btree ("_parent_id");
		CREATE INDEX IF NOT EXISTS "galery_images_image_idx" ON "galery_images" USING btree ("image_id");
	`)
}

