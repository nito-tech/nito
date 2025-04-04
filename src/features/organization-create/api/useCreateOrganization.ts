import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import type { CreateOrganizationInput } from "../model/create-organization-schema";
import { createOrganization } from "./create-organization";

type UseCreateOrganizationOptions = {
	mutationConfig?: Omit<Parameters<typeof useMutation>[0], "mutationFn">;
};

export const useCreateOrganization = ({
	mutationConfig,
}: UseCreateOrganizationOptions = {}) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		onSuccess: async (...args) => {
			// router.push("/｛{organization.id}");
			mutationConfig?.onSuccess?.(...args);
		},
		mutationFn: (data: { data: CreateOrganizationInput }) =>
			createOrganization(data),
		...mutationConfig,
	});
};
