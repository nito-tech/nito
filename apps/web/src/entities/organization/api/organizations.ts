"use server";

import {
	type InsertOrganization,
	type SelectOrganization,
	type SelectOrganizationMember,
	type SelectProfile,
	db,
	organizationMembersTable,
	organizationsTable,
	profilesTable,
} from "@nito/db";
import { and, desc, eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

import { getUser } from "@/shared/api/user";

type GetOrganizationsOptions = {
	profileId?: SelectProfile["id"];
	limit?: number;
	offset?: number;
	orderBy?: keyof InsertOrganization;
	orderDirection?: "asc" | "desc";
};

/**
 * Get organizations with pagination and filtering options
 *
 * @param options - Query options for organizations
 * @returns Organizations and total count
 */
export const getOrganizations = async ({
	profileId,
	limit = 10,
	offset = 0,
	orderBy = "createdAt",
	orderDirection = "desc",
}: GetOrganizationsOptions = {}): Promise<{
	organizations: SelectOrganization[];
	count: number;
}> => {
	const user = await getUser();

	// TODO: ユーザーが所属している組織を取得する

	// Base query for organizations
	const baseQuery = db
		.select({
			id: organizationsTable.id,
			name: organizationsTable.name,
			slug: organizationsTable.slug,
			description: organizationsTable.description,
			avatarUrl: organizationsTable.avatarUrl,
			createdAt: organizationsTable.createdAt,
			updatedAt: organizationsTable.updatedAt,
		})
		.from(organizationsTable);

	// If profileId is provided, filter organizations where user is a member
	if (profileId) {
		baseQuery.innerJoin(
			organizationMembersTable,
			and(
				eq(organizationMembersTable.organizationId, organizationsTable.id),
				eq(organizationMembersTable.profileId, profileId),
			),
		);
	}

	// Get total count
	const [{ count }] = await db
		.select({
			count: sql<number>`count(*)`,
		})
		.from(baseQuery.as("base"));

	// Get organizations with pagination and ordering
	const organizations = (await baseQuery
		.orderBy(
			orderDirection === "desc"
				? desc(organizationsTable[orderBy])
				: organizationsTable[orderBy],
		)
		.limit(limit)
		.offset(offset)) satisfies SelectOrganization[];

	return {
		organizations,
		count,
	};
};

/**
 * Check if the user has access to the organization
 *
 * @param organizationId The ID of the organization to check access to
 * @param userId The ID of the user to check access for
 * @returns A promise that resolves to a boolean indicating if the user has access to the organization
 */
async function isUserOrganizationMember(
	organizationId: SelectOrganization["id"],
): Promise<boolean> {
	try {
		const user = await getUser();

		const [{ count }] = await db
			.select({
				count: sql<number>`count(*)`,
			})
			.from(organizationMembersTable)
			.where(
				and(
					eq(organizationMembersTable.organizationId, organizationId),
					eq(organizationMembersTable.profileId, user.id),
				),
			);

		return count > 0;
	} catch (error) {
		console.error("Error checking organization membership:", error);
		throw new Error(
			error instanceof Error
				? error.message
				: "An unexpected error occurred while checking organization membership",
		);
	}
}

/**
 * Fetch an organization by Slug
 *
 * @param slug The slug of the organization to fetch
 * @returns A promise that resolves to the organization
 */
export async function getOrganizationBySlug(slug: SelectOrganization["slug"]) {
	const [organization] = await db
		.select()
		.from(organizationsTable)
		.where(eq(organizationsTable.slug, slug))
		.limit(1);

	if (!organization) {
		throw new Error("Organization not found");
	}

	const isMember = await isUserOrganizationMember(organization.id);
	if (!isMember) {
		redirect("/not-found");
	}

	return organization;
}

/**
 * Fetch members of an organization
 *
 * @param organizationId The ID of the organization whose members to fetch
 * @returns A promise that resolves to an array of members
 */
export async function getOrganizationMembersWithProfiles(
	organizationId: SelectOrganization["id"],
): Promise<
	(SelectOrganizationMember & {
		profile: Pick<
			SelectProfile,
			"id" | "email" | "displayName" | "avatarUrl" | "username"
		>;
	})[]
> {
	try {
		return await db
			.select({
				id: organizationMembersTable.id,
				organizationId: organizationMembersTable.organizationId,
				profileId: organizationMembersTable.profileId,
				role: organizationMembersTable.role,
				createdAt: organizationMembersTable.createdAt,
				updatedAt: organizationMembersTable.updatedAt,
				profile: {
					id: profilesTable.id,
					email: profilesTable.email,
					displayName: profilesTable.displayName,
					avatarUrl: profilesTable.avatarUrl,
					username: profilesTable.username,
				},
			})
			.from(organizationMembersTable)
			.innerJoin(
				profilesTable,
				eq(profilesTable.id, organizationMembersTable.profileId),
			)
			.where(eq(organizationMembersTable.organizationId, organizationId))
			.orderBy(desc(organizationMembersTable.createdAt));
	} catch (error) {
		console.error("Error fetching organization members:", error);
		throw error;
	}
}

export async function updateOrganization(
	data: { id: SelectOrganization["id"] } & Partial<
		Pick<SelectOrganization, "name" | "slug">
	>,
): Promise<SelectOrganization> {
	try {
		const updateData: Partial<Pick<SelectOrganization, "name" | "slug">> = {};
		if (data.name !== undefined) updateData.name = data.name;
		if (data.slug !== undefined) updateData.slug = data.slug;

		const [updatedOrganization] = await db
			.update(organizationsTable)
			.set(updateData)
			.where(eq(organizationsTable.id, data.id))
			.returning();

		return updatedOrganization;
	} catch (error) {
		console.error("Error updating organization:", error);
		throw error;
	}
}
