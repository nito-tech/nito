"use server";

import { redirect } from "next/navigation";

import { getUser } from "@/shared/api/user";
import { createServerClient } from "@/shared/lib/supabase/server";
import type { Member, Organization, Profile } from "@/shared/schema";
import type { Database } from "@/shared/schema";

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

	const { data, error } = await supabase
		.from("organizations")
		.select()
		.eq("slug", slug)
		.single();

	if (error) {
		throw new Error(error.message);
	}

	const isMember = await isUserOrganizationMember(data.id);
	if (!isMember) {
		redirect("/not-found");
	}

	return data;
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
