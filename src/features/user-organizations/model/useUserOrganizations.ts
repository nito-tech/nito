"use client";

import type { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

import { getUserOrganizations } from "@/entities/organization/api/organizations";
import { queryKeys } from "@/shared/lib/query-keys";
import type { QueryConfig } from "@/shared/lib/reqct-query";

type UseUserOrganizationsOptions = {
	userId: User["id"];
	queryConfig?: QueryConfig<typeof getUserOrganizations>;
};

/**
 * Get user organizations
 *
 * @param userId The ID of the user whose organizations to fetch
 * @returns Query result containing the list of organizations
 */
export function useUserOrganizations({
	userId,
	queryConfig,
}: UseUserOrganizationsOptions) {
	return useQuery({
		queryKey: queryKeys.organization,
		queryFn: () => getUserOrganizations(userId),
		enabled: !!userId,
		...queryConfig,
	});
}
