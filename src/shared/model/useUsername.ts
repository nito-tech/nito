"use client";

import { useState } from "react";

import { checkUsernameExists as checkUsernameExistsAction } from "../api/check-username-exists";

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
