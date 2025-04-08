"use server";

import { redirect } from "next/navigation";

import { getUser } from "@/shared/api/user";
import { createServerClient } from "@/shared/lib/supabase/server";
import type { Organization } from "@/shared/schema";

/**
 * Fetch organizations where the user is a member
 *
 * @returns A promise that resolves to an array of organizations
 */
export async function getOrganizations(): Promise<Organization[]> {
	const supabase = await createServerClient();
	const user = await getUser();

	// First, get the organization IDs where the user is a member
	const { data: memberData, error: memberError } = await supabase
		.from("members")
		.select("organization_id")
		.eq("user_id", user.id)
		.eq("is_active", true);

	if (memberError) {
		throw new Error(memberError.message);
	}

	// Extract organization IDs from the member data
	const organizationIds = memberData.map((member) => member.organization_id);

	// Then, get the organizations
	const { data, error } = await supabase
		.from("organizations")
		.select()
		.in("id", organizationIds)
		.order("name", { ascending: true });

	if (error) {
		throw new Error(error.message);
	}

	return data;
}

/**
 * Check if the user has access to the organization
 *
 * @param organizationId The ID of the organization to check access to
 * @param userId The ID of the user to check access for
 * @returns A promise that resolves to a boolean indicating if the user has access to the organization
 */
async function isUserOrganizationMember(
	organizationId: Organization["id"],
): Promise<boolean> {
	const supabase = await createServerClient();
	const user = await getUser();

	const { data, error } = await supabase
		.from("members")
		.select()
		.eq("organization_id", organizationId)
		.eq("user_id", user.id);

	if (error) {
		throw new Error(error.message);
	}

	return data.length > 0;
}

/**
 * Fetch an organization by Slug
 *
 * @param slug The slug of the organization to fetch
 * @returns A promise that resolves to the organization
 */
export async function getOrganizationBySlug(
	slug: Organization["slug"],
): Promise<Organization> {
	const supabase = await createServerClient();

	const { data: organizationData, error: organizationError } = await supabase
		.from("organizations")
		.select("id")
		.eq("slug", slug);

	if (organizationError) {
		throw new Error(organizationError.message);
	}

	const isMember = await isUserOrganizationMember(organizationData[0].id);
	if (!isMember) {
		redirect("/not-found");
	}

	const { data, error } = await supabase
		.from("organizations")
		.select()
		.eq("slug", slug);

	console.log(data);

	if (error) {
		throw new Error(error.message);
	}

	return data[0];
}
