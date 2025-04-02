// XXX:
// This should be moved to /shared, but it remains in /entities for now
// as moving it would cause Storybook tests to fail.

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
