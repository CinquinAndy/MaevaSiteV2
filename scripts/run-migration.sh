#!/bin/bash

# Load environment variables if .env.local exists
if [ -f .env.local ]; then
    echo "📦 Loading environment variables from .env.local..."
    export $(cat .env.local | grep -v '^#' | xargs)
elif [ -f .env ]; then
    echo "📦 Loading environment variables from .env..."
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if DATABASE_URI is set
if [ -z "$DATABASE_URI" ]; then
    echo "❌ ERROR: DATABASE_URI environment variable is not set"
    echo "Please set it in .env.local or .env file"
    exit 1
fi

echo "🚀 Running gallery migration..."
echo "📍 Using database: ${DATABASE_URI%%\?*}"
echo ""

# Run the SQL migration
psql "$DATABASE_URI" -f scripts/migrate-galery.sql

if [ $? -eq 0 ]; then
    echo ""
    echo "✅✅✅ Migration completed successfully! ✅✅✅"
    echo ""
    echo "Next steps:"
    echo "  1. Test the admin UI - multi-upload should work"
    echo "  2. Test the frontend - gallery pages should render correctly"
    echo "  3. Run: pnpm run build && pnpm run lint"
else
    echo ""
    echo "❌ Migration failed. Check the error messages above."
    exit 1
fi

