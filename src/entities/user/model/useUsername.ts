// XXX:
// This should be moved to /shared, but it remains in /entities for now
// as moving it would cause Storybook tests to fail.

"use client";

import { useState } from "react";

import { checkUsernameExists as checkUsernameExistsAction } from "../../../shared/api/check-username-exists";

export function useUsername() {
	const [isLoading, setIsLoading] = useState(false);

	const checkUsernameExists = async (username: string) => {
		if (!username) return;

		setIsLoading(true);

		try {
			await checkUsernameExistsAction(username);
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			}

			// throw new Error("An unknown error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	return { checkUsernameExists, isLoading };
}
