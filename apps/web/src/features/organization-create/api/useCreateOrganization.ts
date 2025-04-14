import { useMutation } from "@tanstack/react-query";

import type { MutationConfig } from "@/shared/lib/reqct-query";

import type { CreateOrganizationInput } from "../model/create-organization-schema";
import { createOrganization } from "./create-organization";

type UseCreateOrganizationOptions = {
	mutationConfig?: MutationConfig<typeof createOrganization>;
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
