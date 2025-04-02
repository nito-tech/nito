import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { queryKeys } from "@/lib/query-keys";

import { logInWithEmail } from "../api/log-in-with-email";

type UseLogInWithEmailOptions = {
	mutationConfig?: Omit<Parameters<typeof useMutation>[0], "mutationFn">;
};

export const useLogInWithEmail = ({
	mutationConfig,
}: UseLogInWithEmailOptions = {}) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
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

			router.push("/dashboard");

			mutationConfig?.onSuccess?.(...args);
		},
		mutationFn: logInWithEmail,
		...mutationConfig,
	});
};
