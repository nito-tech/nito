import type { ResponseError } from "./base";
import type { Database } from "./supabase";

/**
 * Type definition for a user profile
 * This type represents the structure of a profile in the database
 */
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

/**
 * Type definition for inserting a new profile
 * This type represents the structure required when creating a new profile
 */
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];

/**
 * Type definition for updating a profile
 * This type represents the structure when updating an existing profile
 */
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

/**
 * Type definition for a profile with optional fields
 * This type is useful when dealing with partial profile data
 */
export type ProfileWithOptionalFields = Partial<Profile>;

/**
 * Type definition for a profile with required fields
 * This type ensures all required fields are present
 */
export type ProfileWithRequiredFields = Required<
	Pick<Profile, "id" | "username">
>;

/**
 * Type definition for a profile with optional fields except for id
 * This type ensures the id field is always present while other fields are optional
 */
export type ProfileWithRequiredId = Required<Pick<Profile, "id">> &
	Partial<Omit<Profile, "id">>;

/**
 * Type definition for the profile context
 * This type represents the shape of the profile context that will be provided to the application
 */
export type ProfileContextType = {
	/**
	 * The current user's profile data
	 * null if no profile exists or if the user is not authenticated
	 */
	profile: Profile | null;

	/**
	 * Whether the profile data is currently being loaded
	 */
	isLoading: boolean;

	/**
	 * Any error that occurred while loading or updating the profile
	 */
	error: ResponseError | null;

	/**
	 * Function to update the user's profile
	 * @param data The profile data to update
	 * @returns A promise that resolves when the update is complete
	 */
	updateProfile: (data: ProfileUpdate) => Promise<void>;

	/**
	 * Function to refresh the profile data
	 * This is useful when you need to force a refresh of the profile data
	 * @returns A promise that resolves when the refresh is complete
	 */
	refreshProfile: () => Promise<void>;
};
