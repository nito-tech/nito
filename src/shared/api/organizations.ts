"use server";

import type { User } from "@supabase/supabase-js";

import { createServerClient } from "@/shared/lib/supabase/server";
import type { Organization } from "@/shared/schema";

/**
 * Fetch organizations where the user is a member
 *
 * @param userId The ID of the user whose organizations to fetch
 * @returns A promise that resolves to an array of organizations
 */
export async function getUserOrganizations(
	userId: User["id"],
): Promise<
	Pick<Organization, "id" | "name" | "slug" | "created_at" | "updated_at">[]
> {
	const supabase = await createServerClient();

	// First, get the organization IDs where the user is a member
	const { data: memberData, error: memberError } = await supabase
		.from("members")
		.select("organization_id")
		.eq("user_id", userId)
		.eq("is_active", true);

	if (memberError) {
		throw new Error(memberError.message);
	}

	// Extract organization IDs from the member data
	const organizationIds = memberData.map((member) => member.organization_id);

	// Then, get the organizations
	const { data, error } = await supabase
		.from("organizations")
		.select(`
			id,
			name,
			slug,
			created_at,
			updated_at
		`)
		.in("id", organizationIds)
		.order("name", { ascending: true });

	if (error) {
		throw new Error(error.message);
	}

	return data;
}
