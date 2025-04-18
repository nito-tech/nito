"use server";

import {
	type InsertOrganization,
	type SelectOrganization,
	type SelectProfile,
	db,
	organizationMembersTable,
	organizationsTable,
} from "@nito/db";
import { and, desc, eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

import { getUser } from "@/shared/api/user";
import { createServerClient } from "@/shared/lib/supabase/server";
import type { Member, Organization, Profile } from "@/shared/schema";

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
export async function getOrganizationBySlug(
	slug: Organization["slug"],
): Promise<SelectOrganization> {
	try {
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

		return {
			id: organization.id,
			name: organization.name,
			slug: organization.slug,
			description: organization.description,
			avatarUrl: organization.avatarUrl,
			createdAt: organization.createdAt,
			updatedAt: organization.updatedAt,
		};
	} catch (error) {
		console.error("Error fetching organization by slug:", error);
		throw new Error(
			error instanceof Error
				? error.message
				: "An unexpected error occurred while fetching the organization",
		);
	}
}

/**
 * Fetch members of an organization
 *
 * @param organizationId The ID of the organization whose members to fetch
 * @returns A promise that resolves to an array of members
 */
export async function getOrganizationMembers(
	organizationId: Organization["id"],
): Promise<
	(Member & {
		profile: Pick<Profile, "id" | "email" | "display_name" | "avatar_url">;
	})[]
> {
	const supabase = await createServerClient();

	// First, get the members
	const { data: members, error: membersError } = await supabase
		.from("members")
		.select("*")
		.eq("organization_id", organizationId)
		.eq("is_active", true)
		.order("joined_at", { ascending: false });

	if (membersError) {
		throw new Error(membersError.message);
	}

	// Then, get the profiles for these members
	const { data: profiles, error: profilesError } = await supabase
		.from("profiles")
		.select("id, email, display_name, avatar_url")
		.in(
			"id",
			members.map((member) => member.user_id),
		);

	if (profilesError) {
		throw new Error(profilesError.message);
	}

	const data = members.map((member) => {
		const profile = profiles.find((profile) => profile.id === member.user_id);
		if (!profile) {
			throw new Error(`Profile not found for user ${member.user_id}`);
		}
		return {
			...member,
			profile,
		};
	});

	return data;
}

export async function updateOrganization(
	data: { id: Organization["id"] } & Partial<
		Pick<Organization, "name" | "slug">
	>,
) {
	const supabase = await createServerClient();

	const updateData: Partial<Pick<Organization, "name" | "slug">> = {};
	if (data.name !== undefined) updateData.name = data.name;
	if (data.slug !== undefined) updateData.slug = data.slug;

	const { error } = await supabase
		.from("organizations")
		.update(updateData)
		.eq("id", data.id);

	if (error) {
		throw new Error(error.message);
	}
}
