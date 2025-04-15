CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(50),
	"display_name" varchar(100),
	"email" text NOT NULL,
	"avatar_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "authenticated can view all profiles" ON "users" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "users can update own profile" ON "users" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (auth.uid() = id);--> statement-breakpoint
CREATE POLICY "users can insert own profile" ON "users" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (auth.uid() = id);--> statement-breakpoint
CREATE POLICY "users can delete own profile" ON "users" AS PERMISSIVE FOR DELETE TO "authenticated" USING (auth.uid() = id);
