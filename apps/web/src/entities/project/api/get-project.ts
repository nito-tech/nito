"use server";

import {
	type SelectOrganization,
	type SelectProfile,
	type SelectProject,
	type SelectProjectMember,
	db,
	organizationMembersTable,
	profilesTable,
	projectMembersTable,
} from "@nito/db";
import { and, eq } from "drizzle-orm";

import { getUser } from "@/shared/api/user";

/**
 * Fetch project members
 *
 * @param organizationId The ID of the organization
 * @param projectId The ID of the project whose members to fetch
 * @returns A promise that resolves to an array of project members
 */
export async function getProjectMembersWithProfiles(
	organizationId: SelectOrganization["id"],
	projectId: SelectProject["id"],
): Promise<
	(SelectProjectMember & {
		profile: Pick<
			SelectProfile,
			"id" | "email" | "displayName" | "avatarUrl" | "username"
		>;
	})[]
> {
	try {
		const user = await getUser();

		// Check if the user is a member of the organization
		const [member] = await db
			.select()
			.from(organizationMembersTable)
			.where(
				and(
					eq(organizationMembersTable.profileId, user.id),
					eq(organizationMembersTable.organizationId, organizationId),
				),
			)
			.limit(1);

		if (!member) {
			throw new Error("Member not found");
		}

		// Get project members with their profiles
		const projectMembers = await db
			.select({
				id: projectMembersTable.id,
				projectId: projectMembersTable.projectId,
				memberId: projectMembersTable.memberId,
				role: projectMembersTable.role,
				createdAt: projectMembersTable.createdAt,
				updatedAt: projectMembersTable.updatedAt,
				profile: {
					id: profilesTable.id,
					email: profilesTable.email,
					displayName: profilesTable.displayName,
					avatarUrl: profilesTable.avatarUrl,
					username: profilesTable.username,
				},
			})
			.from(projectMembersTable)
			.innerJoin(
				organizationMembersTable,
				eq(organizationMembersTable.id, projectMembersTable.memberId),
			)
			.innerJoin(
				profilesTable,
				eq(profilesTable.id, organizationMembersTable.profileId),
			)
			.where(eq(projectMembersTable.projectId, projectId));

		return projectMembers;
	} catch (error) {
		console.error("Error fetching project members:", error);
		throw new Error(
			error instanceof Error
				? error.message
				: "An unexpected error occurred while fetching project members",
		);
	}
}
