import { relations, sql } from "drizzle-orm";
import {
	check,
	index,
	pgPolicy,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";

import { createdAt, id, updatedAt } from "./_utils";
import { organizationsTable } from "./organizations";

export const projectsTable = pgTable(
	"projects",
	{
		id,
		name: varchar("name", { length: 100 }).notNull(), // used as slug
		description: text("description"),
		organizationId: uuid("organization_id")
			.notNull()
			.references(() => organizationsTable.id, { onDelete: "cascade" }),
		createdAt,
		updatedAt,
	},
	(table) => [
		/**
		 * プロジェクト名（slugとして利用される）
		 *
		 * - 使用可能な文字：小文字のアルファベット(a-z)、数字(0-9)、ドット(.)、アンダースコア(_)、ハイフン(-)
		 * - 長さ: 最大100文字まで
		 * - スペース: 半角スペース、全角スペースともに使用不可
		 * - 一意性: 組織内で一意である必要がある
		 */
		check(
			"project_name_check",
			sql`${table.name} ~ '^[a-z0-9._-]+$' AND length(${table.name}) <= 100 AND ${table.name} !~ '[\\s　]'`,
		),
		// プロジェクト名は組織内で一意
		sql`UNIQUE (${table.organizationId}, ${table.name})`,
		// インデックス
		index("idx_projects_organization_id").on(table.organizationId),
		index("projects_name_idx").on(table.name),
		// 閲覧ポリシー：組織メンバーはプロジェクトを閲覧可能
		pgPolicy("Members can view projects", {
			for: "select",
			to: authenticatedRole,
			using: sql`EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = organization_id
				AND organization_members.user_id = auth.uid()
				AND organization_members.role IN ('OWNER', 'DEVELOPER', 'BILLING', 'VIEWER')
			)`,
		}),
		// 作成ポリシー：オーナーと開発者はプロジェクトを作成可能
		pgPolicy("Owners and developers can create projects", {
			for: "insert",
			to: authenticatedRole,
			using: sql`EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = organization_id
				AND organization_members.user_id = auth.uid()
				AND organization_members.role IN ('OWNER', 'DEVELOPER')
			)`,
		}),
		// 更新ポリシー：オーナーと開発者はプロジェクトを更新可能
		pgPolicy("Owners and developers can update projects", {
			for: "update",
			to: authenticatedRole,
			using: sql`EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = organization_id
				AND organization_members.user_id = auth.uid()
				AND organization_members.role IN ('OWNER', 'DEVELOPER')
			)`,
		}),
		// 削除ポリシー（ソフトデリート）：オーナーのみがプロジェクトを削除可能
		pgPolicy("Only owners can delete projects", {
			for: "update",
			to: authenticatedRole,
			using: sql`EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = organization_id
				AND organization_members.user_id = auth.uid()
				AND organization_members.role = 'OWNER'
			) AND NOT is_active`,
		}),
	],
).enableRLS();

// プロジェクトのリレーション定義
export const projectsRelations = relations(projectsTable, ({ one }) => ({
	organization: one(organizationsTable, {
		fields: [projectsTable.organizationId],
		references: [organizationsTable.id],
	}),
}));

export type InsertProject = typeof projectsTable.$inferInsert;
export type SelectProject = typeof projectsTable.$inferSelect;
