"use client";

import { useQuery } from "@tanstack/react-query";

import { getOrganizations } from "../api/get-organizations";

/**
 * Hook to fetch and manage organization list
 * @param userId The ID of the user whose organizations to fetch
 * @returns Query result containing the list of organizations
 */
export function useOrganizationList(userId: string) {
	return useQuery({
		queryKey: ["organizations", userId],
		queryFn: () => getOrganizations(userId),
	});
}
