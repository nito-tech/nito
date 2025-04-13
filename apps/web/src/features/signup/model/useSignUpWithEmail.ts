import { useMutation } from "@tanstack/react-query";

import { signUpWithEmail } from "../api/sign-up-with-email";

type UseSignUpWithEmailOptions = {
	mutationConfig?: Omit<Parameters<typeof useMutation>[0], "mutationFn">;
};

export const useSignUpWithEmail = ({
	mutationConfig,
}: UseSignUpWithEmailOptions = {}) => {
	return useMutation({
		onSuccess: async (...args) => {
			// await queryClient.invalidateQueries({
			// 	queryKey: queryKeys.auth.session,
			// });

			mutationConfig?.onSuccess?.(...args);
		},
		mutationFn: signUpWithEmail,
		...mutationConfig,
	});
};
