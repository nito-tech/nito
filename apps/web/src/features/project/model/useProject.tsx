"use client";

import type {
	InsertProject,
	SelectOrganization,
	SelectProject,
} from "@nito/db";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getProjectMembersWithProfiles } from "@/entities/project/api/get-project";
import {
	createProject,
	getProjectByName,
	getProjects,
} from "@/entities/project/api/projects";
import { queryKeys } from "@/shared/lib/query-keys";
import type { MutationConfig, QueryConfig } from "@/shared/lib/reqct-query";

type UseProjectOptions = {
	organizationId: SelectOrganization["id"];
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
		queryKey: queryKeys.project.all(organizationId),
		queryFn: () => getProjects({ organizationId }),
		...queryConfig,
		staleTime: 24 * 60 * 60 * 1000, // 1 day
	});
}

type UseProjectByNameOptions = {
	organizationId: SelectOrganization["id"];
	projectName: SelectProject["name"];
	queryConfig?: QueryConfig<typeof getProjectByName>;
};

/**
 * Get project by name
 *
 * @returns Query result containing the project
 */
export function useGetProjectByName({
	organizationId,
	projectName,
	queryConfig,
}: UseProjectByNameOptions) {
	return useQuery({
		queryKey: queryKeys.project.byName(organizationId, projectName),
		queryFn: () => getProjectByName(organizationId, projectName),
		...queryConfig,
		staleTime: 24 * 60 * 60 * 1000, // 1 day
	});
}

type UseCreateProjectOptions = {
	organizationId: SelectOrganization["id"];
	queryConfig: MutationConfig<typeof createProject>;
};

export function useCreateProject({
	organizationId,
	queryConfig,
}: UseCreateProjectOptions) {
	return useMutation({
		mutationFn: ({ projectName }: { projectName: InsertProject["name"] }) =>
			createProject({
				organizationId,
				projectName,
			}),
		...queryConfig,
	});
}

type UseGetProjectMembersOptions = {
	id: SelectProject["id"];
	organizationId: SelectOrganization["id"];
	queryConfig?: QueryConfig<typeof getProjectMembersWithProfiles>;
};

/**
 * Get project members
 *
 * @returns Query result containing the list of project members
 */
export function useGetProjectMembersWithProfiles({
	id,
	organizationId,
	queryConfig,
}: UseGetProjectMembersOptions) {
	return useQuery({
		queryKey: queryKeys.project.members(id),
		queryFn: () => getProjectMembersWithProfiles(organizationId, id),
		...queryConfig,
		staleTime: 24 * 60 * 60 * 1000, // 1 day
	});
}
