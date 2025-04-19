import { sql } from "drizzle-orm";
import {
	foreignKey,
	pgPolicy,
	pgTable,
	text,
	varchar,
} from "drizzle-orm/pg-core";
import { authUsers, authenticatedRole } from "drizzle-orm/supabase";

import { createdAt, id, updatedAt } from "./_utils";

export const profilesTable = pgTable(
	"profiles",
	{
		id,
		username: varchar("username", { length: 50 }).unique(),
		displayName: varchar("display_name", { length: 100 }),
		email: text("email").notNull(),
		avatarUrl: text("avatar_url"),
		createdAt,
		updatedAt,
	},
	(table) => [
		foreignKey({
			columns: [table.id],
			foreignColumns: [authUsers.id],
			name: "users_id_fk",
		}),
		// テーブル制約
		// usernameのフォーマット制約：英数字とアンダースコアのみ使用可能
		sql`CHECK (${table.username} ~ '^[a-zA-Z0-9_][a-zA-Z0-9_]*$')`,
		// usernameの予約語制約：特定の予約語は使用不可
		sql`CHECK (${table.username} !~ '^(admin|root|system|user|test|guest|anonymous|null|undefined|true|false)$')`,
		// display_nameの長さ制約：最低1文字以上必要
		sql`CHECK (char_length(${table.displayName}) >= 1)`,
		// display_nameの改行禁止制約：改行文字を含めない
		sql`CHECK (${table.displayName} !~ '[\n\r]')`,
		// avatar_urlのフォーマット制約：有効なURL形式であること（nullは許可）
		sql`CHECK (${table.avatarUrl} IS NULL OR ${table.avatarUrl} ~ '^https?://[a-zA-Z0-9][a-zA-Z0-9\-\._\~:/\?#@!$&''()*+,;=]*$')`,
		// RLSポリシー
		// 閲覧ポリシー：認証済みユーザーは全てのプロフィール情報を閲覧能
		pgPolicy("Authenticated can view all profiles", {
			for: "select",
			to: authenticatedRole,
			using: sql`true`,
		}),
		// 更新ポリシー：認証済みユーザーは自分のプロフィールを更新可能
		pgPolicy("Profiles can update own profile", {
			for: "update",
			to: authenticatedRole,
			using: sql`auth.uid() = id`,
		}),
		// 作成ポリシー：認証済みユーザーは自分のプロフィールを作成可能
		pgPolicy("Profiles can insert own profile", {
			for: "insert",
			to: authenticatedRole,
			withCheck: sql`auth.uid() = id`,
		}),
		// 削除ポリシー：認証済みユーザーは自分のプロフィールを削除可能
		pgPolicy("Profiles can delete own profile", {
			for: "delete",
			to: authenticatedRole,
			using: sql`auth.uid() = id`,
		}),
	],
).enableRLS();

export type InsertProfile = typeof profilesTable.$inferInsert;
export type SelectProfile = typeof profilesTable.$inferSelect;
