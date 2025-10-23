-- Migration script to convert galery_images to galery_rels for hasMany support
-- Run with: psql $DATABASE_URL -f scripts/migrate-galery.sql

BEGIN;

-- Check if galery_images exists
DO $$
BEGIN
    IF EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'galery_images'
    ) THEN
        RAISE NOTICE '✅ Found galery_images table. Proceeding with migration...';
        
        -- Create the new galery_rels table for hasMany relationship
        CREATE TABLE IF NOT EXISTS "galery_rels" (
            "id" serial PRIMARY KEY NOT NULL,
            "order" integer,
            "parent_id" integer NOT NULL,
            "path" varchar NOT NULL,
            "media_id" integer
        );
        
        RAISE NOTICE '✅ Created galery_rels table';
        
        -- Migrate existing data from galery_images to galery_rels
        INSERT INTO "galery_rels" ("order", "parent_id", "path", "media_id")
        SELECT "_order", "_parent_id", 'images', "image_id"
        FROM "galery_images";
        
        RAISE NOTICE '✅ Migrated data from galery_images to galery_rels';
        
        -- Drop the old galery_images table and its constraints
        DROP TABLE IF EXISTS "galery_images" CASCADE;
        
        RAISE NOTICE '✅ Dropped galery_images table';
        
        -- Add foreign key constraints to the new table
        ALTER TABLE "galery_rels" 
            ADD CONSTRAINT "galery_rels_parent_fk" 
            FOREIGN KEY ("parent_id") REFERENCES "galery"("id") 
            ON DELETE cascade ON UPDATE no action;
        
        ALTER TABLE "galery_rels" 
            ADD CONSTRAINT "galery_rels_media_fk" 
            FOREIGN KEY ("media_id") REFERENCES "media"("id") 
            ON DELETE cascade ON UPDATE no action;
        
        RAISE NOTICE '✅ Added foreign key constraints';
        
        -- Create indexes for performance
        CREATE INDEX IF NOT EXISTS "galery_rels_order_idx" ON "galery_rels" USING btree ("order");
        CREATE INDEX IF NOT EXISTS "galery_rels_parent_idx" ON "galery_rels" USING btree ("parent_id");
        CREATE INDEX IF NOT EXISTS "galery_rels_path_idx" ON "galery_rels" USING btree ("path");
        CREATE INDEX IF NOT EXISTS "galery_rels_media_id_idx" ON "galery_rels" USING btree ("media_id");
        
        RAISE NOTICE '✅ Created indexes';
        
        -- Record migration in payload_migrations table
        INSERT INTO "payload_migrations" ("name", "batch", "created_at", "updated_at")
        VALUES ('20251023_convert_galery_to_hasmany', 1, NOW(), NOW())
        ON CONFLICT DO NOTHING;
        
        RAISE NOTICE '✅ Recorded migration in database';
        
    ELSE
        RAISE NOTICE '❌ galery_images table does not exist. Migration not needed.';
    END IF;
END $$;

-- Verify migration
SELECT COUNT(*) as "Migrated gallery images" 
FROM "galery_rels" 
WHERE "path" = 'images';

COMMIT;

