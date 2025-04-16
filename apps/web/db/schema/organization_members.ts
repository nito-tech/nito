import { relations, sql } from "drizzle-orm";
import {
	foreignKey,
	pgEnum,
	pgPolicy,
	pgTable,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";

import { createdAt, id, updatedAt } from "./_utils";
import { organizationsTable } from "./organizations";
import { profilesTable } from "./profiles";

export const organizationRoleEnum = pgEnum("organization_role", [
	"OWNER",
	"DEVELOPER",
	"BILLING",
	"VIEWER",
]);

export const organizationMembersTable = pgTable(
	"organization_members",
	{
		id,
		organizationId: uuid("organization_id").notNull(),
		profileId: uuid("profile_id").notNull(),
		role: organizationRoleEnum("role").notNull().default("VIEWER"),
		createdAt,
		updatedAt,
	},
	(table) => [
		// 外部キー制約
		foreignKey({
			columns: [table.organizationId],
			foreignColumns: [organizationsTable.id],
			name: "organization_members_organization_id_fk",
		}),
		foreignKey({
			columns: [table.profileId],
			foreignColumns: [profilesTable.id],
			name: "organization_members_profile_id_fk",
		}),
		// 一意制約：同じプロファイル（= ユーザー）が同じ組織に複数回所属できない
		sql`UNIQUE (${table.organizationId}, ${table.profileId})`,
		// 閲覧ポリシー：認証済みユーザーは全ての組織メンバー情報を閲覧可能
		pgPolicy("authenticated users can view organization members", {
			for: "select",
			to: authenticatedRole,
			using: sql`EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = organization_id
				AND organization_members.user_id = auth.uid()
				AND organization_members.role = 'OWNER'
			)`,
		}),
		// 作成ポリシー：組織のオーナーのみが新しいメンバーを追加可能
		// 組織のオーナーかどうかは、organization_membersテーブルで確認
		pgPolicy("only owners can insert organization members", {
			for: "insert",
			to: authenticatedRole,
			using: sql`EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = organization_id
				AND organization_members.user_id = auth.uid()
				AND organization_members.role = 'OWNER'
			)`,
		}),
		// 更新ポリシー：組織のオーナーのみがメンバー情報を更新可能
		// 組織のオーナーかどうかは、organization_membersテーブルで確認
		pgPolicy("only owners can update organization members", {
			for: "update",
			to: authenticatedRole,
			using: sql`EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = organization_id
				AND organization_members.user_id = auth.uid()
				AND organization_members.role = 'OWNER'
			)`,
		}),
		// 削除ポリシー：組織のオーナーのみがメンバーを削除可能
		// 組織のオーナーかどうかは、organization_membersテーブルで確認
		pgPolicy("only owners can delete organization members", {
			for: "delete",
			to: authenticatedRole,
			using: sql`EXISTS (
				SELECT 1 FROM organization_members
				WHERE organization_members.organization_id = organization_id
				AND organization_members.user_id = auth.uid()
				AND organization_members.role = 'OWNER'
			)`,
		}),
	],
).enableRLS();

// 組織メンバーのリレーション定義
export const organizationMembersRelations = relations(
	organizationMembersTable,
	({ one }) => ({
		organization: one(organizationsTable, {
			fields: [organizationMembersTable.organizationId],
			references: [organizationsTable.id],
		}),
		profile: one(profilesTable, {
			fields: [organizationMembersTable.profileId],
			references: [profilesTable.id],
		}),
	}),
);

export type InsertOrganizationMember =
	typeof organizationMembersTable.$inferInsert;
export type SelectOrganizationMember =
	typeof organizationMembersTable.$inferSelect;
