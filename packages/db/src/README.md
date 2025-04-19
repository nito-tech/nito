# DB

It manages Drizzle's schema for use in the database.
Migration and seed data additions are also handled by this package.

## Dashboard

You can use either of the following.

### Drizzle Studio

```sh
pnpm drizzle-kit studio
open https://local.drizzle.studio/
```

### Supabase Studio

```sh
# 1. Run Docker Desktop

# 2. Start Supabase on local
npx supabase@latest start
    
# 3. Open Supabase Studio
open http://127.0.0.1:54323/project/default
```

## How to migrate and add seed data

```sh
# 0. Reset database
# Seed data is NOT submitted because supabase/seed.sql does not exist
npx supabase@latest db reset

# 1. Update drizzle schema files

# 2. Push to db
npx drizzle-kit push

# 3. Generate migration file
pnpm drizzle-kit generate --name=<YOUR_MIGRATION_MESSAGE>

# 4. Update seed.ts

# 5. Apply seed data
pnpm seed
```

## Tips

```sh
# Stop local DB
npx supabase@latest stop

# Complete database reset and run all migrations from scratch (often used on local)
# 1. Reset database (delete all tables)
# 2. Recreate database
# 3. Initialize schema
# 4. Apply global settings from roles.sql
# 5. Execute the migration files in the supabase/migrations directory in order
# 6. Execute supabase/seed.sql if available (seed data submission)
npx supabase@latest db reset

# Re-run all migrations without resetting the database
# - Do not reset the database
# - Perform only new migrations
# - Retain existing data
npx supabase db push

# Perform only unapplied migrations without resetting the database
# - Do not reset database
# - Retain existing data
# - Do not maintain migration history
npx supabase migration up

# Perform unapplied migration
npx supabase migration up

# Run up to a specific migration
npx supabase migration up 20240320000000

# Check migration status
npx supabase migration list

# Undo last migration
npx supabase migration down

# Revert to a specific migration
npx supabase migration down 20240320000000
```
