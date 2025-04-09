"use server";

import { getUser } from "@/shared/api/user";
import { createServerClient } from "@/shared/lib/supabase/server";
import type { Organization, Project } from "@/shared/schema";

/**
 * Fetch projects where the user is a member of the organization and a project member
 *
 * @param organizationId The ID of the organization whose projects to fetch
 * @returns A promise that resolves to an array of projects with their members
 */
export async function getProjects(
	organizationId: Organization["id"],
): Promise<Project[]> {
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
		return [];
	}

	// Then, get the project IDs where the user is a project member
	const { data: projectIds, error: projectIdsError } = await supabase
		.from("project_members")
		.select("project_id")
		.eq("member_id", memberData.id);
	// .eq("user_id", user.id);

	if (projectIdsError) {
		throw new Error(projectIdsError.message);
	}

	if (!projectIds || projectIds.length === 0) {
		return [];
	}

	// Finally, get the projects
	const { data, error } = await supabase
		.from("projects")
		.select("*")
		.eq("organization_id", organizationId)
		.eq("status", "active")
		.in(
			"id",
			projectIds.map((p) => p.project_id),
		)
		.order("name", { ascending: true });

	if (error) {
		throw new Error(error.message);
	}

	return data;
}
