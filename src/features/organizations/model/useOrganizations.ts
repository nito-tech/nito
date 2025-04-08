"use client";

import { useQuery } from "@tanstack/react-query";

import {
	getOrganizationBySlug,
	getOrganizations,
} from "@/entities/organization/api/organizations";
import { queryKeys } from "@/shared/lib/query-keys";
import type { QueryConfig } from "@/shared/lib/reqct-query";
import type { Organization } from "@/shared/schema";

type UseOrganizationsOptions = {
	queryConfig?: QueryConfig<typeof getOrganizations>;
};

/**
 * Get user organizations
 *
 * @returns Query result containing the list of organizations
 */
export function useOrganizations({
	queryConfig = {},
}: UseOrganizationsOptions = {}) {
	return useQuery({
		queryKey: queryKeys.organization.all,
		queryFn: () => getOrganizations(),
		...queryConfig,
	});
}

type UseOrganizationBySlugOptions = {
	slug: Organization["slug"];
	queryConfig?: QueryConfig<typeof getOrganizationBySlug>;
};

/**
 * Get organization by slug
 *
 * @param slug The slug of the organization to fetch
 * @param userId The ID of the user whose organization to fetch
 * @returns Query result containing the organization
 */
export function useOrganizationBySlug({
	slug,
	queryConfig,
}: UseOrganizationBySlugOptions) {
	return useQuery({
		queryKey: queryKeys.organization.bySlug(slug),
		queryFn: () => getOrganizationBySlug(slug),
		enabled: !!slug,
		...queryConfig,
	});
}
