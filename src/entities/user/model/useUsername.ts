"use client";

import { useMutation } from "@tanstack/react-query";

import { checkUsernameExists } from "@/entities/user/api/check-username-exists";

/**
 * Custom hook for checking if a username exists
 *
 * @returns Object containing mutateAsync function and isLoading state
 */
export function useUsername() {
	const { mutateAsync, isPending: isLoading } = useMutation({
		mutationFn: async (username: string) => {
			if (!username) return;
			return checkUsernameExists(username);
		},
	});

	return { checkUsernameExists: mutateAsync, isLoading };
}
