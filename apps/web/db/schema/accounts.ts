import { sql } from "drizzle-orm";
import {
	pgPolicy,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { authUsers, authenticatedRole } from "drizzle-orm/supabase";

import { usersTable } from "./users";

/**
 * Better-auth用のaccountsテーブル
 */
export const accountsTable = pgTable(
	"accounts",
	{
		id: uuid("id").defaultRandom().primaryKey().notNull(),
		userId: uuid("user_id")
			.notNull()
			.references(() => usersTable.id, { onDelete: "cascade" }),
		type: varchar("type", { length: 50 }).notNull(),
		provider: varchar("provider", { length: 50 }).notNull(),
		providerAccountId: varchar("provider_account_id", {
			length: 255,
		}).notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: timestamp("expires_at", { withTimezone: true }),
		token_type: varchar("token_type", { length: 50 }),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(table) => [
		// providerとproviderAccountIdの複合ユニーク制約
		sql`UNIQUE (${table.provider}, ${table.providerAccountId})`,
		// RLSポリシー
		pgPolicy("Users can manage their own accounts", {
			for: "all", // select, insert, update, delete
			to: authenticatedRole,
			using: sql`user_id = auth.uid()`,
		}),
	],
).enableRLS();
