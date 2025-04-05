"use server";

import { getTranslations } from "next-intl/server";

import { createServerClient } from "@/shared/lib/supabase/server";

import type { OrganizationSlugInput } from "../model/organization-slug-schema";

/**
 * Check if the organization slug already exists
 *
 * @param slug - The organization slug to check
 * @returns The response from the database
 * @throws Error if the slug already exists
 * @remarks This function is case-insensitive, meaning "test-org" and "Test-Org" are considered the same
 */
export async function checkSlugExists(slug: OrganizationSlugInput) {
	const t = await getTranslations();
	const supabase = await createServerClient();
	const { data: response, error } = await supabase
		.from("organizations")
		.select("slug")
		.ilike("slug", slug);

	if (error) {
		throw new Error(t("Organization.validation.slug.alreadyExists"));
	}

	return response;
}
