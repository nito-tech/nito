import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

import { isAuthPage, isAuthRequiredPage } from "../pathname";
import { supabaseAnonKey, supabaseUrl } from "./config";

/**
 * Generate a new response with the same cookies as the old response
 *
 * @remarks
 * This function is crucial for maintaining authentication state during redirects.
 * It ensures cookies are properly transferred from the original response to the
 * new redirect response to prevent session termination.
 *
 * IMPORTANT: You *must* return the supabaseResponse object as it is.
 * If you're creating a new response object with NextResponse.next() make sure to:
 * 1. Pass the request in it, like so:
 *   const myNewResponse = NextResponse.next({ request })
 * 2. Copy over the cookies, like so:
 * myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
 * 3. Change the myNewResponse object to fit your needs, but avoid changing
 *   the cookies!
 * 4. Finally:
 *    return myNewResponse
 *
 * If this is not done, you may be causing the browser and server to go out
 * of sync and terminate the user's session prematurely!
 *
 * @param oldResponse - The original response containing authentication cookies
 * @param request - The incoming request object
 * @param redirectUrl - The URL to redirect to
 * @returns A new response with preserved cookies and redirect status
 */
function generateNewResponse(
	oldResponse: NextResponse,
	request: NextRequest,
	redirectUrl: string,
) {
	const newResponse = NextResponse.redirect(new URL(redirectUrl, request.url));

	// Copy cookies from oldResponse
	const allCookies = oldResponse.cookies.getAll();
	for (const cookie of allCookies) {
		newResponse.cookies.set(cookie);
	}

	return newResponse;
}

/**
 * Updates the user session and handles authentication-based redirects
 *
 * @remarks
 * This middleware function performs several important tasks:
 * 1. Refreshes authentication tokens automatically on each request
 * 2. Passes updated tokens to both browser and server components
 * 3. Implements authentication-based routing rules:
 *    - Redirects unauthenticated users to login when accessing protected routes
 *    - Redirects authenticated users to dashboard when accessing auth pages
 *    - Allows public routes and auth callback processing
 *
 * @param request - The incoming request object
 * @returns A response object, possibly with redirects or updated cookies
 */
export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({ request });

	const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet) {
				// Pass refreshed auth tokens to server components
				for (const { name, value } of cookiesToSet) {
					request.cookies.set(name, value);
				}
				supabaseResponse = NextResponse.next({
					request,
				});

				// Pass refreshed auth tokens to the browser
				for (const { name, value, options } of cookiesToSet) {
					supabaseResponse.cookies.set(name, value, options);
				}
			},
		},
	});

	// Get current user (refreshes auth tokens)
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const pathname = request.nextUrl.pathname;

	if (!user) {
		// If log in from the /login page, allow access to auth callback route
		if (pathname.startsWith("/auth/callback")) {
			return supabaseResponse;
		}

		if (isAuthPage(pathname)) {
			return supabaseResponse;
		}

		// Redirect to /login if non-logged-in and access to private page
		if (isAuthRequiredPage(pathname)) {
			return generateNewResponse(supabaseResponse, request, "/login");
		}
	}

	if (user) {
		// Redirect to /dashboard if already logged in and accessing /login or /signup
		if (isAuthPage(pathname)) {
			return generateNewResponse(supabaseResponse, request, "/dashboard");
		}
	}

	// Return the updated response with refreshed tokens
	return supabaseResponse;
}
