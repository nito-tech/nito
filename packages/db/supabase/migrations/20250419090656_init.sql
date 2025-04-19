CREATE TYPE "public"."organization_role" AS ENUM('OWNER', 'DEVELOPER', 'BILLING', 'VIEWER');--> statement-breakpoint
CREATE TYPE "public"."project_member_role" AS ENUM('OWNER', 'EDITOR', 'VIEWER');--> statement-breakpoint
CREATE TABLE "organization_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"profile_id" uuid NOT NULL,
	"role" "organization_role" DEFAULT 'VIEWER' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "organization_members" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(50) NOT NULL,
	"description" text,
	"avatar_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "organizations_slug_unique" UNIQUE("slug"),
	CONSTRAINT "name_length" CHECK ("organizations"."name" ~ '^.+$'),
	CONSTRAINT "name_no_newline" CHECK ("organizations"."name" !~ '
'),
	CONSTRAINT "slug_format" CHECK ("organizations"."slug" ~ '^[a-z0-9-][a-z0-9-]*$'),
	CONSTRAINT "slug_reserved" CHECK ("organizations"."slug" !~ '^($1)$'),
	CONSTRAINT "avatar_url_format" CHECK ("organizations"."avatar_url" IS NULL OR "organizations"."avatar_url" ~ '^https?://.*')
);
--> statement-breakpoint
ALTER TABLE "organizations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(50),
	"display_name" varchar(100),
	"email" text NOT NULL,
	"avatar_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "project_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"member_id" uuid NOT NULL,
	"role" "project_member_role" DEFAULT 'EDITOR' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "project_members" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"organization_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "project_name_check" CHECK ("projects"."name" ~ '^[a-z0-9._-]+$' AND length("projects"."name") <= 100 AND "projects"."name" !~ '[\s　]')
);
--> statement-breakpoint
ALTER TABLE "projects" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_member_id_organization_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."organization_members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_project_members_project_id" ON "project_members" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_project_members_member_id" ON "project_members" USING btree ("member_id");--> statement-breakpoint
CREATE INDEX "idx_project_members_role" ON "project_members" USING btree ("role");--> statement-breakpoint
CREATE INDEX "idx_projects_organization_id" ON "projects" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "projects_name_idx" ON "projects" USING btree ("name");--> statement-breakpoint
CREATE POLICY "authenticated users can view organization members" ON "organization_members" AS PERMISSIVE FOR SELECT TO "authenticated" USING (EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = organization_id
				AND organization_members.profile_id = auth.uid()
				AND organization_members.role = 'OWNER'
			));--> statement-breakpoint
CREATE POLICY "only owners can insert organization members" ON "organization_members" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = organization_id
				AND organization_members.profile_id = auth.uid()
				AND organization_members.role = 'OWNER'
			));--> statement-breakpoint
CREATE POLICY "only owners can update organization members" ON "organization_members" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = organization_id
				AND organization_members.profile_id = auth.uid()
				AND organization_members.role = 'OWNER'
			));--> statement-breakpoint
CREATE POLICY "only owners can delete organization members" ON "organization_members" AS PERMISSIVE FOR DELETE TO "authenticated" USING (EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = organization_id
				AND organization_members.profile_id = auth.uid()
				AND organization_members.role = 'OWNER'
			));--> statement-breakpoint
CREATE POLICY "Organization members can view organizations" ON "organizations" AS PERMISSIVE FOR SELECT TO "authenticated" USING (EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = id
				AND organization_members.profile_id = auth.uid()
			));--> statement-breakpoint
CREATE POLICY "Authenticated users can create organizations" ON "organizations" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "Only owners can update organizations" ON "organizations" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = id
				AND organization_members.profile_id = auth.uid()
				AND organization_members.role = 'OWNER'
			));--> statement-breakpoint
CREATE POLICY "Only owners can delete organizations" ON "organizations" AS PERMISSIVE FOR DELETE TO "authenticated" USING (EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = id
				AND organization_members.profile_id = auth.uid()
				AND organization_members.role = 'OWNER'
			));--> statement-breakpoint
CREATE POLICY "Authenticated can view all profiles" ON "profiles" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "Profiles can update own profile" ON "profiles" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (auth.uid() = id);--> statement-breakpoint
CREATE POLICY "Profiles can insert own profile" ON "profiles" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (auth.uid() = id);--> statement-breakpoint
CREATE POLICY "Profiles can delete own profile" ON "profiles" AS PERMISSIVE FOR DELETE TO "authenticated" USING (auth.uid() = id);--> statement-breakpoint
CREATE POLICY "Users can view project members they are members of" ON "project_members" AS PERMISSIVE FOR SELECT TO "authenticated" USING (EXISTS (
				SELECT 1 FROM projects p
				JOIN organization_members m ON m.organization_id = p.organization_id
				WHERE p.id = project_id
				AND m.profile_id = auth.uid()
			));--> statement-breakpoint
CREATE POLICY "Allow all authenticated users to insert project members" ON "project_members" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "Users can update project members if they are project owners" ON "project_members" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (EXISTS (
				SELECT 1 FROM project_members pm
				JOIN projects p ON p.id = pm.project_id
				JOIN organization_members m ON m.id = pm.member_id
				WHERE pm.project_id = project_id
				AND m.profile_id = auth.uid()
				AND pm.role = 'OWNER'
			));--> statement-breakpoint
CREATE POLICY "Users can delete project members if they are project owners" ON "project_members" AS PERMISSIVE FOR DELETE TO "authenticated" USING (EXISTS (
				SELECT 1 FROM project_members pm
				JOIN projects p ON p.id = pm.project_id
				JOIN organization_members m ON m.id = pm.member_id
				WHERE pm.project_id = project_id
				AND m.profile_id = auth.uid()
				AND pm.role = 'OWNER'
			));--> statement-breakpoint
CREATE POLICY "Members can view projects" ON "projects" AS PERMISSIVE FOR SELECT TO "authenticated" USING (EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = organization_id
				AND organization_members.profile_id = auth.uid()
				AND organization_members.role IN ('OWNER', 'DEVELOPER', 'BILLING', 'VIEWER')
			));--> statement-breakpoint
CREATE POLICY "Owners and developers can create projects" ON "projects" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = organization_id
				AND organization_members.profile_id = auth.uid()
				AND organization_members.role IN ('OWNER', 'DEVELOPER')
			));--> statement-breakpoint
CREATE POLICY "Owners and developers can update projects" ON "projects" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = organization_id
				AND organization_members.profile_id = auth.uid()
				AND organization_members.role IN ('OWNER', 'DEVELOPER')
			));