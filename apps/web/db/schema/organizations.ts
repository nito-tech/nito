import { relations, sql } from "drizzle-orm";
import {
	check,
	pgPolicy,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";

import { organizationMembersTable } from "./organization_members";

// 予約語の定義
const RESERVED_ORGANIZATION_SLUGS = [
	"admin",
	"root",
	"system",
	"user",
	"test",
	"guest",
	"anonymous",
	"null",
	"undefined",
	"true",
	"false",
] as const;

// 組織テーブルの定義
export const organizationsTable = pgTable(
	"organizations",
	{
		id: uuid().primaryKey().defaultRandom(),
		name: varchar("name", { length: 100 }).notNull(),
		slug: varchar("slug", { length: 50 }).notNull().unique(),
		description: text("description"),
		avatar_url: text("avatar_url"),
		created_at: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
		updated_at: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [
		// 組織名の制約：1文字以上必要で、改行を含まない
		check("name_length", sql`${table.name} ~ '^.+$'`),
		check("name_no_newline", sql`${table.name} !~ '\n'`),
		// スラッグの制約：小文字、数字、ハイフンのみ使用可能で、予約語は使用不可
		check("slug_format", sql`${table.slug} ~ '^[a-z0-9-][a-z0-9-]*$'`),
		check(
			"slug_reserved",
			sql`${table.slug} !~ '^(${RESERVED_ORGANIZATION_SLUGS.join("|")})$'`,
		),
		// アバターURLの制約：nullまたは有効なURL形式
		check(
			"avatar_url_format",
			sql`${table.avatar_url} IS NULL OR ${table.avatar_url} ~ '^https?://.*'`,
		),
		// 閲覧ポリシー：組織メンバーのみが組織情報を閲覧可能
		pgPolicy("Organization members can view organizations", {
			for: "select",
			to: authenticatedRole,
			using: sql`EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = id
				AND organization_members.user_id = auth.uid()
			)`,
		}),
		// 作成ポリシー：認証済みユーザーは組織を作成可能
		pgPolicy("Authenticated users can create organizations", {
			for: "insert",
			to: authenticatedRole,
			using: sql`true`,
		}),
		// 更新ポリシー：組織のオーナーのみが組織情報を更新可能
		pgPolicy("Only owners can update organizations", {
			for: "update",
			to: authenticatedRole,
			using: sql`EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = id
				AND organization_members.user_id = auth.uid()
				AND organization_members.role = 'OWNER'
			)`,
		}),
		// 削除ポリシー：組織のオーナーのみが組織を削除可能
		pgPolicy("Only owners can delete organizations", {
			for: "delete",
			to: authenticatedRole,
			using: sql`EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = id
				AND organization_members.user_id = auth.uid()
				AND organization_members.role = 'OWNER'
			)`,
		}),
	],
).enableRLS();

// 組織のリレーション定義
export const organizationsRelations = relations(
	organizationsTable,
	({ many }) => ({
		members: many(organizationMembersTable),
	}),
);
