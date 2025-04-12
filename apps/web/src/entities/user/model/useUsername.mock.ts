"use client";

import { fn } from "@storybook/test";

export const mockCheckUsernameExists = fn(async (username: string) => {
	if (username === "already_exists_username") {
		throw new Error("Username already exists");
	}
});

export function useUsername() {
	return {
		checkUsernameExists: mockCheckUsernameExists,
		isLoading: false,
	};
}
