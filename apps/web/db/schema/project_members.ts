import { relations, sql } from "drizzle-orm";
import {
	index,
	pgEnum,
	pgPolicy,
	pgTable,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";

import { createdAt, id, updatedAt } from "./_utils";
import { organizationMembersTable } from "./organization_members";
import { projectsTable } from "./projects";

export const projectMemberRoleEnum = pgEnum("project_member_role", [
	"OWNER",
	"EDITOR",
	"VIEWER",
]);

export const projectMembersTable = pgTable(
	"project_members",
	{
		id,
		projectId: uuid("project_id")
			.notNull()
			.references(() => projectsTable.id, { onDelete: "cascade" }),
		memberId: uuid("member_id")
			.notNull()
			.references(() => organizationMembersTable.id, { onDelete: "cascade" }),
		role: projectMemberRoleEnum("role").notNull().default("EDITOR"),
		createdAt,
		updatedAt,
	},
	(table) => [
		// プロジェクトとメンバーの組み合わせは一意
		sql`UNIQUE (${table.projectId}, ${table.memberId})`,
		// インデックス
		index("idx_project_members_project_id").on(table.projectId),
		index("idx_project_members_member_id").on(table.memberId),
		index("idx_project_members_role").on(table.role),
		// 閲覧ポリシー：プロジェクトメンバーは閲覧可能
		pgPolicy("Users can view project members they are members of", {
			for: "select",
			to: authenticatedRole,
			using: sql`EXISTS (
				SELECT 1 FROM projects p
				JOIN organization_members m ON m.organization_id = p.organization_id
				WHERE p.id = project_id
				AND m.user_id = auth.uid()
			)`,
		}),
		// 作成ポリシー：認証済みユーザーはプロジェクトメンバーを追加可能
		pgPolicy("Allow all authenticated users to insert project members", {
			for: "insert",
			to: authenticatedRole,
			using: sql`true`,
		}),
		// 更新ポリシー：プロジェクトのオーナーのみがメンバー情報を更新可能
		pgPolicy("Users can update project members if they are project owners", {
			for: "update",
			to: authenticatedRole,
			using: sql`EXISTS (
				SELECT 1 FROM project_members pm
				JOIN projects p ON p.id = pm.project_id
				JOIN organization_members m ON m.id = pm.member_id
				WHERE pm.project_id = project_id
				AND m.user_id = auth.uid()
				AND pm.role = 'OWNER'
			)`,
		}),
		// 削除ポリシー：プロジェクトのオーナーのみがメンバーを削除可能
		pgPolicy("Users can delete project members if they are project owners", {
			for: "delete",
			to: authenticatedRole,
			using: sql`EXISTS (
				SELECT 1 FROM project_members pm
				JOIN projects p ON p.id = pm.project_id
				JOIN organization_members m ON m.id = pm.member_id
				WHERE pm.project_id = project_id
				AND m.user_id = auth.uid()
				AND pm.role = 'OWNER'
			)`,
		}),
	],
).enableRLS();

// プロジェクトメンバーのリレーション定義
export const projectMembersRelations = relations(
	projectMembersTable,
	({ one }) => ({
		project: one(projectsTable, {
			fields: [projectMembersTable.projectId],
			references: [projectsTable.id],
		}),
		member: one(organizationMembersTable, {
			fields: [projectMembersTable.memberId],
			references: [organizationMembersTable.id],
		}),
	}),
);

export type InsertProjectMembers = typeof projectMembersTable.$inferInsert;
export type SelectProjectMembers = typeof projectMembersTable.$inferSelect;
