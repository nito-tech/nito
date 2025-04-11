import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/lib/query-keys";
import type { MutationConfig } from "@/shared/lib/reqct-query";

import { logInWithEmail } from "../api/log-in-with-email";

type UseLogInWithEmailOptions = {
	mutationConfig?: MutationConfig<typeof logInWithEmail>;
};

export const useLogInWithEmail = ({
	mutationConfig,
}: UseLogInWithEmailOptions = {}) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: logInWithEmail,
		onSuccess: async (...args) => {
			// Since login is performed server-side, the onAuthStateChange in AuthProvider that executes client-side doesn't fire
			// As a result, user information doesn't appear in the sidebar
			// Therefore, by explicitly setting the session, we make user information display properly in the sidebar
			// const supabase = createBrowserClient();
			// await supabase.auth.setSession(session);

			// Invalidate the session query to force a refetch
			await queryClient.invalidateQueries({
				queryKey: queryKeys.auth.session,
			});

			mutationConfig?.onSuccess?.(...args);
		},
		...mutationConfig,
	});
};
