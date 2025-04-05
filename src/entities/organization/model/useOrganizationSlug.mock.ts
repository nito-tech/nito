"use client";

import { fn } from "@storybook/test";

export const mockCheckOrganizationSlugExists = fn((slug: string) => {
	if (slug === "already-exists-slug") {
		throw new Error("This slug is already taken");
	}
});

export function useOrganizationSlug() {
	return {
		checkOrganizationSlugExists: mockCheckOrganizationSlugExists,
		isLoading: false,
	};
}
