"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { getProjectMembers } from "@/entities/project/api/get-project";
import {
	createProject,
	getProjectByName,
	getProjects,
} from "@/entities/project/api/projects";
import { queryKeys } from "@/shared/lib/query-keys";
import type { MutationConfig, QueryConfig } from "@/shared/lib/reqct-query";
import type { Organization, Project } from "@/shared/schema";

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
		queryKey: queryKeys.project.all(organizationId),
		queryFn: () => getProjects(organizationId),
		...queryConfig,
		staleTime: 24 * 60 * 60 * 1000, // 1 day
	});
}

type UseProjectByNameOptions = {
	organizationId: Organization["id"];
	projectName: Project["name"];
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
	organizationId: Organization["id"];
	queryConfig: MutationConfig<typeof createProject>;
};

export function useCreateProject({
	organizationId,
	queryConfig,
}: UseCreateProjectOptions) {
	return useMutation<Project, Error, Project["name"]>({
		mutationFn: (projectName) => createProject(organizationId, projectName),
		...queryConfig,
	});
}

type UseGetProjectMembersOptions = {
	id: Project["id"];
	organizationId: Organization["id"];
	queryConfig?: QueryConfig<typeof getProjectMembers>;
};

/**
 * Get project members
 *
 * @returns Query result containing the list of project members
 */
export function useGetProjectMembers({
	id,
	organizationId,
	queryConfig,
}: UseGetProjectMembersOptions) {
	return useQuery({
		queryKey: queryKeys.project.members(id),
		queryFn: () => getProjectMembers(organizationId, id),
		...queryConfig,
		staleTime: 24 * 60 * 60 * 1000, // 1 day
	});
}
