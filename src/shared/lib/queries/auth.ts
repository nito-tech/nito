import type { Session } from "@supabase/supabase-js";

import { createBrowserClient } from "@/shared/lib/supabase/client";

/**
 * Retrieves the current session from Supabase.
 * This function is used to check if a user is authenticated and get their session information.
 *
 * @returns {Promise<Session | null>} The current session object if authenticated, null otherwise
 * @throws {Error} If there's an error retrieving the session
 *
 * @example
 * ```typescript
 * try {
 *   const session = await getSession();
 *   if (session) {
 *     console.log('User is authenticated:', session.user.email);
 *   } else {
 *     console.log('User is not authenticated');
 *   }
 * } catch (error) {
 *   console.error('Error getting session:', error);
 * }
 * ```
 */
export const getSession = async (): Promise<Session | null> => {
	const supabase = createBrowserClient();
	const {
		data: { session },
		error,
	} = await supabase.auth.getSession();

	if (error) {
		throw error;
	}

	return session;
};
