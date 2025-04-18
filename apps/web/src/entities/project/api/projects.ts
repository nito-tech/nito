"use server";

import { getUser } from "@/shared/api/user";
import { createServerClient } from "@/shared/lib/supabase/server";
import type { Organization, Project } from "@/shared/schema";
import { and, desc, eq, sql } from "drizzle-orm";

import {
	type InsertProject,
	type SelectProject,
	db,
	projectMembersTable,
	projectsTable,
} from "@nito/db";

type GetProjectsOptions = {
	organizationId: Organization["id"];
	memberId?: string;
	limit?: number;
	offset?: number;
	orderBy?: keyof InsertProject;
	orderDirection?: "asc" | "desc";
};

/**
 * Get projects with pagination and filtering options
 *
 * @param options - Query options for projects
 * @returns Projects and total count
 */
export const getProjects = async ({
	organizationId,
	memberId,
	limit = 10,
	offset = 0,
	orderBy = "createdAt",
	orderDirection = "desc",
}: GetProjectsOptions): Promise<{
	projects: SelectProject[];
	count: number;
}> => {
	try {
		// Base query for projects
		const baseQuery = db
			.select({
				id: projectsTable.id,
				name: projectsTable.name,
				description: projectsTable.description,
				organizationId: projectsTable.organizationId,
				createdAt: projectsTable.createdAt,
				updatedAt: projectsTable.updatedAt,
			})
			.from(projectsTable)
			.where(eq(projectsTable.organizationId, organizationId));

		// If memberId is provided, filter projects where user is a member
		if (memberId) {
			baseQuery.innerJoin(
				projectMembersTable,
				and(
					eq(projectMembersTable.projectId, projectsTable.id),
					eq(projectMembersTable.memberId, memberId),
				),
			);
		}

		// Get total count
		const [{ count }] = await db
			.select({
				count: sql<number>`count(*)`,
			})
			.from(baseQuery.as("base"));

		// Get projects with pagination and ordering
		const projects = (await baseQuery
			.orderBy(
				orderDirection === "desc"
					? desc(projectsTable[orderBy])
					: projectsTable[orderBy],
			)
			.limit(limit)
			.offset(offset)) satisfies SelectProject[];

		return {
			projects,
			count,
		};
	} catch (error) {
		console.error("Error fetching projects:", error);
		throw new Error(
			error instanceof Error
				? error.message
				: "An unexpected error occurred while fetching projects",
		);
	}
};

export async function getProjectByName(
	organizationId: Organization["id"],
	projectName: Project["name"],
): Promise<Project> {
	const supabase = await createServerClient();
	const user = await getUser();

	// First, get the member ID for the user in this organization
	const { data: memberData, error: memberError } = await supabase
		.from("members")
		.select("id")
		.eq("user_id", user.id)
		.eq("organization_id", organizationId)
		.single();

	if (memberError) {
		throw new Error(memberError.message);
	}

	if (!memberData) {
		throw new Error("Member not found");
	}

	const { data, error } = await supabase
		.from("projects")
		.select("*")
		.eq("name", projectName)
		.eq("organization_id", organizationId)
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return data;
}

export async function createProject(
	organizationId: Organization["id"],
	projectName: Project["name"],
): Promise<Project> {
	const supabase = await createServerClient();
	const user = await getUser();

	// Check if the project name already exists in the organization
	const { data: existingProject } = await supabase
		.from("projects")
		.select("*")
		.eq("name", projectName)
		.eq("organization_id", organizationId)
		.single();

	if (existingProject) {
		throw new Error("Project name already exists");
	}

	const { data, error } = await supabase
		.from("projects")
		.insert({
			name: projectName,
			organization_id: organizationId,
			status: "active",
		})
		.select("*")
		.single();

	if (error) {
		throw new Error(error.message);
	}

	// Get the member ID for the user in this organization
	const { data: memberData, error: memberError } = await supabase
		.from("members")
		.select("id")
		.eq("user_id", user.id)
		.eq("organization_id", organizationId)
		.single();

	if (memberError) {
		throw new Error(memberError.message);
	}

	if (!memberData) {
		throw new Error("Member not found");
	}

	// Add user as a project member
	const { error: projectMemberError } = await supabase
		.from("project_members")
		.insert({
			project_id: data.id,
			member_id: memberData.id,
			role: "OWNER",
		});

	if (projectMemberError) {
		throw new Error(projectMemberError.message);
	}

	return data;
}
