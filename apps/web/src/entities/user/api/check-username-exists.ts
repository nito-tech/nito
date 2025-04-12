"use server";

import { getTranslations } from "next-intl/server";

import type { UsernameInput } from "@/entities/user/model/username-schema";
import { createServerClient } from "@/shared/lib/supabase/server";

/**
 * Check if the username already exists
 *
 * @param username - The username to check
 * @throws Error if the username already exists
 * @remarks This function is case-insensitive, meaning "testuser" and "TestUser" are considered the same
 */
export async function checkUsernameExists(username: UsernameInput) {
	const t = await getTranslations();
	const supabase = await createServerClient();

	const { data: existingProfile } = await supabase
		.from("profiles")
		.select("id")
		.ilike("username", username)
		.single();

	if (existingProfile) {
		throw new Error(t("Auth.validation.usernameAlreadyExists"));
	}
}
