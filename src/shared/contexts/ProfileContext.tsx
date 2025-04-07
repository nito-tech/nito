"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";

import { getProfile, updateProfile } from "@/entities/profile/api/profile";
import { queryKeys } from "@/shared/lib/query-keys";
import type { Profile, UpdateProfile } from "@/shared/schema";
import type { ResponseError } from "@/shared/types/base";

import { useAuth } from "./AuthContext";

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
	updateProfile: (data: UpdateProfile) => Promise<void>;

	/**
	 * Function to refresh the profile data
	 * This is useful when you need to force a refresh of the profile data
	 * @returns A promise that resolves when the refresh is complete
	 */
	refreshProfile: () => Promise<void>;
};

/**
 * Context for managing user profile data
 * This context provides access to the current user's profile information and methods to update it
 */
const ProfileContext = createContext<ProfileContextType>({
	profile: null,
	isLoading: false,
	error: null,
	updateProfile: async () => {
		throw new Error("ProfileContext not initialized");
	},
	refreshProfile: async () => {
		throw new Error("ProfileContext not initialized");
	},
});

/**
 * Provider component for the profile context
 * This component manages the profile data and provides methods to update it
 */
export function ProfileProvider({ children }: { children: React.ReactNode }) {
	const queryClient = useQueryClient();
	const { user } = useAuth();

	const {
		data: profile,
		isLoading,
		error,
	} = useQuery({
		queryKey: queryKeys.profile.get(user?.id),
		queryFn: () => getProfile(user?.id),
		enabled: !!user?.id,
	});

	const updateProfileMutation = async (
		data: Parameters<typeof updateProfile>[0],
	) => {
		if (!user?.id) {
			throw new Error("User not authenticated");
		}
		await updateProfile(data);
		await queryClient.invalidateQueries({
			queryKey: queryKeys.profile.get(user.id),
		});
	};

	const refreshProfile = async () => {
		if (!user?.id) {
			throw new Error("User not authenticated");
		}
		await queryClient.invalidateQueries({
			queryKey: queryKeys.profile.get(user.id),
		});
	};

	return (
		<ProfileContext.Provider
			value={{
				profile: profile ?? null,
				isLoading,
				error: error as Error | null, // TODO: fix this
				updateProfile: updateProfileMutation,
				refreshProfile,
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
}

/**
 * Custom hook to access the profile context
 * This hook provides access to the current user's profile information and methods to update it
 *
 * @returns {ProfileContextType} The profile context
 * @throws {Error} If used outside of a ProfileProvider
 */
export function useProfile(): ProfileContextType {
	const context = useContext(ProfileContext);
	if (context === undefined) {
		throw new Error("useProfile must be used within a ProfileProvider");
	}
	return context;
}
