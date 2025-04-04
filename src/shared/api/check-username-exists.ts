"use server";

import { getTranslations } from "next-intl/server";

import type { UsernameInput } from "@/entities/user/model/username-schema";
import { createServerClient } from "@/shared/lib/supabase/server";

/**
 * Check if the username already exists
 */
export async function checkUsernameExists(username: UsernameInput) {
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
