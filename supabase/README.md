 # Supabase

## How to use on local?

1. Run Docker Desktop
2. Start Supabase on local
    ```sh
    npx supabase@latest start
    ```
3. Open Supabase Studio
    ```sh
    open http://127.0.0.1:54323/project/default
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
