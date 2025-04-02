"use client";

import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";

import { getSession } from "@/shared/lib/queries/auth";
import { queryKeys } from "@/shared/lib/query-keys";
import { createBrowserClient } from "@/shared/lib/supabase/client";
import type { AuthState } from "@/types/auth";

/**
 * Context for managing authentication state
 *
 * This context provides access to the current user's authentication status and session information
 */
const AuthContext = createContext<AuthState | undefined>(undefined);

/**
 * AuthProvider is a context provider that manages authentication state across the application.
 *
 * It handles:
 * 1. Session Management
 *    - Fetches and maintains the current session
 *    - Refreshes session data every 30 minutes
 *    - Handles session expiration
 *
 * 2. Real-time Authentication State
 *    - Listens for authentication state changes
 *    - Updates the session data in the query cache
 *    - Handles sign-out events
 *
 * 3. Security Features
 *    - Automatically signs out users before session expiration
 *    - Manages online/offline state
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
	const queryClient = useQueryClient();
	const router = useRouter();
	const supabase = createBrowserClient();

	// Query to fetch session information
	const {
		data: session,
		isLoading,
		error,
	} = useQuery({
		queryKey: queryKeys.auth.session,
		queryFn: getSession,
		refetchInterval: 30 * 60 * 1000, // 30 minutes
	});

	/**
	 * Sets up a real-time subscription to auth state changes.
	 * This effect is necessary to handle real-time authentication state changes across the application.
	 *
	 * This effect runs:
	 * 1. On initial mount of the AuthProvider
	 * 2. When queryClient, router, or supabase.auth changes
	 *
	 * It handles:
	 * - Updating the session data in the query cache when auth state changes
	 * - Redirecting to home page on sign out
	 * - Cleaning up the subscription when the component unmounts
	 *
	 * Without this effect:
	 * - Real-time auth state changes would not be reflected
	 * - Changes made in other tabs or devices would not be synchronized
	 * - The application would not respond to immediate auth state changes
	 */
	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(
			async (event: AuthChangeEvent, session: Session | null) => {
				// Update session information
				queryClient.setQueryData(queryKeys.auth.session, session);

				// Handle sign out event
				if (event === "SIGNED_OUT") {
					router.push("/");
				}
			},
		);

		return () => {
			subscription.unsubscribe();
		};
	}, [queryClient, router, supabase.auth]);

	/**
	 * Monitors session expiration and handles automatic sign out.
	 * This effect is necessary to ensure security by automatically signing out users before their session expires.
	 *
	 * This effect runs:
	 * 1. On initial mount of the AuthProvider
	 * 2. When the session data changes
	 *
	 * It handles:
	 * - Checking if the session is about to expire (within 1 minute)
	 * - Automatically signing out the user if the session is about to expire
	 *
	 * Without this effect:
	 * - Users could continue using expired sessions
	 * - No automatic cleanup of expired sessions
	 * - Potential security risks from using expired sessions
	 *
	 * Note: This useEffect works in conjunction with the first:
	 * - First useEffect handles real-time state changes
	 * - This useEffect handles security and session expiration
	 * - Both are necessary for a complete authentication system
	 */
	useEffect(() => {
		if (session?.expires_at) {
			const expiresAt = new Date(session.expires_at * 1000);
			const now = new Date();
			const timeUntilExpiry = expiresAt.getTime() - now.getTime();

			// Sign out 1 minute before session expiration
			if (timeUntilExpiry <= 60 * 1000) {
				logOut();
			}
		}
	}, [session]);

	const logOut = async () => {
		// Use Browser Client to clear the session.
		// If not cleared, the process of verifying duplicate usernames on the /singup page after logout will be skipped.
		const { error } = await supabase.auth.signOut();
		if (error) {
			throw error;
		}

		router.push("/login");
	};

	return (
		<AuthContext.Provider
			value={{
				user: session?.user ?? null,
				session: session ?? null,
				isLoading,
				logOut,
				error: error as Error | null,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

/**
 * Custom hook to access the authentication context
 * This hook provides access to the current user's authentication state and session information
 *
 * @returns {AuthState} The current authentication state
 * @throws {Error} If used outside of an AuthProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, isLoading, error } = useAuth();
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!user) return <div>Please log in</div>;
 *
 *   return <div>Welcome, {user.email}!</div>;
 * }
 * ```
 */
export function useAuth(): AuthState {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
