import { useMutation } from "@tanstack/react-query";

import type { CreateOrganizationInput } from "../model/create-organization-schema";
import { createOrganization } from "./create-organization";

type UseCreateOrganizationOptions = {
	mutationConfig?: Omit<Parameters<typeof useMutation>[0], "mutationFn">;
};

export const useCreateOrganization = ({
	mutationConfig,
}: UseCreateOrganizationOptions = {}) => {
	return useMutation({
		mutationFn: (data: { data: CreateOrganizationInput }) =>
			createOrganization(data),
		onSuccess: async (...args) => {
			// router.push("/｛{organization.id}");
			mutationConfig?.onSuccess?.(...args);
		},
		...mutationConfig,
	});
};
