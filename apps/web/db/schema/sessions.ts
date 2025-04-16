import { sql } from "drizzle-orm";
import {
	pgPolicy,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";

import { usersTable } from "./users";

export const sessionsTable = pgTable(
	"sessions",
	{
		id: uuid("id").defaultRandom().primaryKey().notNull(),
		sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
		userId: uuid("user_id")
			.notNull()
			.references(() => usersTable.id, { onDelete: "cascade" }),
		expires: timestamp("expires", { withTimezone: true }).notNull(),
	},
	(table) => [
		// RLSポリシー
		pgPolicy("Users can manage their own sessions", {
			for: "all",
			to: authenticatedRole,
			using: sql`user_id = auth.uid()`,
		}),
	],
).enableRLS();
