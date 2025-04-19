"use server";

import { type SelectProfile, db, profilesTable } from "@nito/db";
import { eq } from "drizzle-orm";

import { getUser } from "@/shared/api/user";

/**
 * Fetches a user's profile from the database
 *
 * @returns The user's profile data
 */
export const getProfile = async (): Promise<SelectProfile | null> => {
	try {
		const user = await getUser();

		const [profile] = await db
			.select()
			.from(profilesTable)
			.where(eq(profilesTable.id, user.id))
			.limit(1);

		return profile || null;
	} catch (error) {
		console.error("Error fetching profile:", error);
		throw error;
	}
};

/**
 * Updates a user's profile in the database
 *
 * @param data The profile data to update
 */
export const updateProfile = async (data: SelectProfile): Promise<void> => {
	try {
		await db
			.update(profilesTable)
			.set(data)
			.where(eq(profilesTable.id, data.id));
	} catch (error) {
		console.error("Error updating profile:", error);
		throw error;
	}
};
