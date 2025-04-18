"use client";

import type { SelectOrganization } from "@nito/db";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
	getOrganizationBySlug,
	getOrganizationMembersWithProfiles,
	getOrganizations,
	updateOrganization,
} from "@/entities/organization/api/organizations";
import { queryKeys } from "@/shared/lib/query-keys";
import type { MutationConfig, QueryConfig } from "@/shared/lib/reqct-query";

type UseOrganizationsOptions = {
	queryConfig?: QueryConfig<typeof getOrganizations>;
};

/**
 * Get user organizations
 *
 * @returns Query result containing the list of organizations
 */
export function useGetOrganizations({
	queryConfig = {},
}: UseOrganizationsOptions = {}) {
	return useQuery({
		queryKey: queryKeys.organization.all,
		queryFn: () => getOrganizations(),
		...queryConfig,
		staleTime: 24 * 60 * 60 * 1000, // 1 day
	});
}

type UseOrganizationBySlugOptions = {
	slug: SelectOrganization["slug"];
	queryConfig?: QueryConfig<typeof getOrganizationBySlug>;
};

/**
 * Get organization by slug
 *
 * @param slug The slug of the organization to fetch
 * @param userId The ID of the user whose organization to fetch
 * @returns Query result containing the organization
 */
export function useGetOrganizationBySlug({
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

type UseOrganizationMembersOptions = {
	organizationId: SelectOrganization["id"];
	queryConfig?: QueryConfig<typeof getOrganizationMembersWithProfiles>;
};

/**
 * Get members of an organization
 *
 * @param organizationId The ID of the organization whose members to fetch
 * @returns Query result containing the list of members
 */
export function useGetOrganizationMembersWithProfiles({
	organizationId,
	queryConfig = {},
}: UseOrganizationMembersOptions) {
	return useQuery({
		queryKey: queryKeys.organization.members(organizationId),
		queryFn: () => getOrganizationMembersWithProfiles(organizationId),
		enabled: !!organizationId,
		...queryConfig,
	});
}

type UseUpdateOrganizationOptions = {
	organization: { id: SelectOrganization["id"] };
	queryConfig?: MutationConfig<typeof updateOrganization>;
};

export function useUpdateOrganization({
	organization,
	queryConfig,
}: UseUpdateOrganizationOptions) {
	return useMutation({
		mutationFn: (data: Partial<Pick<SelectOrganization, "name" | "slug">>) =>
			updateOrganization({ id: organization.id, ...data }),
		...queryConfig,
	});
}
