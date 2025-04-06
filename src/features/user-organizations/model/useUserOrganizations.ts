"use client";

import type { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

import { getUserOrganizations } from "@/shared/api/organizations";

/**
 * Hook to fetch and manage organization list
 *
 * @param userId The ID of the user whose organizations to fetch
 * @returns Query result containing the list of organizations
 */
export function useUserOrganizations(userId: User["id"]) {
	return useQuery({
		queryKey: ["organizations", userId],
		queryFn: () => getUserOrganizations(userId),
		enabled: !!userId,
	});
}
