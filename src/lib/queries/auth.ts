import { createBrowserClient } from "@/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";

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

/**
 * Signs out the current user from Supabase.
 * This function is used to end the user's session and clear their authentication state.
 *
 * @returns {Promise<void>} A promise that resolves when the sign out is complete
 * @throws {Error} If there's an error during the sign out process
 *
 * @example
 * ```typescript
 * try {
 *   await signOut();
 *   // User has been successfully signed out
 * } catch (error) {
 *   console.error('Error signing out:', error);
 * }
 * ```
 */
export const signOut = async (): Promise<void> => {
	const supabase = createBrowserClient();
	const { error } = await supabase.auth.signOut();

	if (error) {
		throw error;
	}
};
