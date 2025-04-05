"use server";

import { getTranslations } from "next-intl/server";

import type { OrganizationSlugInput } from "@/entities/organization/model/organization-slug-schema";
import { createServerClient } from "@/shared/lib/supabase/server";

/**
 * Check if the organization slug already exists
 */
export async function checkOrganizationSlugExists(slug: OrganizationSlugInput) {
	const t = await getTranslations();
	const supabase = await createServerClient();

	const { data: existingOrganization } = await supabase
		.from("organizations")
		.select("id")
		.eq("slug", slug)
		.single();

	if (existingOrganization) {
		throw new Error(t("Organization.validation.slug.alreadyExists"));
	}
}
