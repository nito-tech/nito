"use server";

import { getTranslations } from "next-intl/server";

import { createServerClient } from "@/lib/supabase/server";
import type { UsernameSchema } from "@/shared/model/types";

/**
 * Check if the username already exists
 */
export async function checkUsernameExists(username: UsernameSchema) {
	const t = await getTranslations();
	const supabase = await createServerClient();

	const { data: existingProfile } = await supabase
		.from("profiles")
		.select("id")
		.eq("username", username)
		.single();

	if (existingProfile) {
		throw new Error(t("Auth.validation.usernameAlreadyExists"));
	}
}
