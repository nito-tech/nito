import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/shared/config/env";

import { organizationMembersTable } from "./schema/organization_members";
import { organizationsTable } from "./schema/organizations";
import { profilesTable } from "./schema/profiles";

const client = postgres(
	"postgresql://postgres:postgres@127.0.0.1:54322/postgres",
);

export const db = drizzle(client, {
	schema: { profilesTable, organizationsTable, organizationMembersTable },
});

export { profilesTable, organizationsTable, organizationMembersTable };
