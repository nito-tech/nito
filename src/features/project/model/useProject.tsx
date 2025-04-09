"use client";

import { useQuery } from "@tanstack/react-query";

import { getProjects } from "@/entities/project/api/projects";
import { queryKeys } from "@/shared/lib/query-keys";
import type { QueryConfig } from "@/shared/lib/reqct-query";
import type { Organization } from "@/shared/schema";

type UseProjectOptions = {
	organizationId: Organization["id"];
	queryConfig?: QueryConfig<typeof getProjects>;
};

/**
 * Get user projects
 *
 * @returns Query result containing the list of projects
 */
export function useGetProjects({
	organizationId,
	queryConfig,
}: UseProjectOptions) {
	return useQuery({
		queryKey: queryKeys.project.all,
		queryFn: () => getProjects(organizationId),
		...queryConfig,
		staleTime: 24 * 60 * 60 * 1000, // 1 day
	});
}
