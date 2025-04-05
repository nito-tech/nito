"use client";

import { useMutation } from "@tanstack/react-query";

import { checkOrganizationSlugExists } from "@/shared/api/check-organization-slug-exists";

export function useOrganizationSlug() {
	const { mutateAsync, isPending: isLoading } = useMutation({
		mutationFn: async (slug: string) => {
			if (!slug) return;
			return checkOrganizationSlugExists(slug);
		},
	});

	return { checkOrganizationSlugExists: mutateAsync, isLoading };
}
