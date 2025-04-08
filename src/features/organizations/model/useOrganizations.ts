"use client";

import type { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

import { getOrganizations } from "@/entities/organization/api/organizations";
import { queryKeys } from "@/shared/lib/query-keys";
import type { QueryConfig } from "@/shared/lib/reqct-query";

type UseOrganizationsOptions = {
	userId: User["id"];
	queryConfig?: QueryConfig<typeof getOrganizations>;
};

/**
 * Get user organizations
 *
 * @param userId The ID of the user whose organizations to fetch
 * @returns Query result containing the list of organizations
 */
export function useOrganizations({
	userId,
	queryConfig,
}: UseOrganizationsOptions) {
	return useQuery({
		queryKey: queryKeys.organization,
		queryFn: () => getOrganizations(userId),
		enabled: !!userId,
		...queryConfig,
	});
}
