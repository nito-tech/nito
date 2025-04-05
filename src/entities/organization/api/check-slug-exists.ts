"use server";

import { getTranslations } from "next-intl/server";

import { createServerClient } from "@/shared/lib/supabase/server";

import type { OrganizationSlugInput } from "../model/organization-slug-schema";

export async function checkSlugExists(slug: OrganizationSlugInput) {
	const t = await getTranslations();
	const supabase = await createServerClient();
	const { data: response, error } = await supabase
		.from("organizations")
		.select("slug")
		.eq("slug", slug);

	if (error) {
		throw new Error(t("Organization.validation.slug.alreadyExists"));
	}

	return response;
}
