import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

import { isAuthPage, isAuthRequiredPage } from "../pathname";
import { supabaseKey, supabaseUrl } from "./config";

/**
 * Generate a new response with the same cookies as the old response
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
 */
function generateNewResponse(
	oldResponse: NextResponse,
	request: NextRequest,
	redirectUrl: string,
) {
	const newResponse = NextResponse.redirect(new URL(redirectUrl, request.url));

	// Copy cookies from supabaseResponse
	const allCookies = oldResponse.cookies.getAll();
	for (const cookie of allCookies) {
		newResponse.cookies.set(cookie);
	}

	return newResponse;
}

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({ request });

	const supabase = createServerClient(supabaseUrl, supabaseKey, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet) {
				for (const { name, value } of cookiesToSet) {
					request.cookies.set(name, value);
				}
				supabaseResponse = NextResponse.next({
					request,
				});
				for (const { name, value, options } of cookiesToSet) {
					supabaseResponse.cookies.set(name, value, options);
				}
			},
		},
	});

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

	// Redirect to /dashboard if already logged in and accessing /login or /signup
	if (user) {
		// Redirect to /dashboard if already logged in and accessing /login or /signup
		if (isAuthPage(pathname)) {
			return generateNewResponse(supabaseResponse, request, "/dashboard");
		}
	}

	return supabaseResponse;
}
