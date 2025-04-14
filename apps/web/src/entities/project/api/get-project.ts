"use server";

import { getUser } from "@/shared/api/user";
import { createServerClient } from "@/shared/lib/supabase/server";
import type { Member, Organization, Project } from "@/shared/schema";

/**
 * Fetch project members
 *
 * @param organizationId The ID of the organization
 * @param projectId The ID of the project whose members to fetch
 * @returns A promise that resolves to an array of project members
 */
export async function getProjectMembers(
	organizationId: Organization["id"],
	projectId: Project["id"],
): Promise<Member[]> {
	const supabase = await createServerClient();
	const user = await getUser();

	return [];
}
