import type { Profile, ProfileUpdate } from "@/types/profile";

import { createBrowserClient } from "@/shared/lib/supabase/client";

/**
 * Fetches a user's profile from the database
 *
 * @param userId The ID of the user whose profile to fetch
 * @returns The user's profile data
 */
export const getProfile = async (
	userId: string | undefined,
): Promise<Profile | null> => {
	if (!userId) {
		return null;
	}

	const supabase = createBrowserClient();
	const { data, error } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", userId)
		.single();

	if (error) {
		throw error;
	}

	return data;
};

/**
 * Updates a user's profile in the database
 *
 * @param data The profile data to update
 */
export const updateProfile = async (data: ProfileUpdate): Promise<void> => {
	const supabase = createBrowserClient();
	const { error } = await supabase
		.from("profiles")
		.update(data)
		.eq("id", data.id);

	if (error) {
		throw error;
	}
};
