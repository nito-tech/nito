import { NextResponse } from "next/server";

import { createServerClient } from "@/shared/lib/supabase/server";
import { getSiteUrl } from "@/shared/utils/url";

/**
 * Handle the callback from the authentication provider.
 *
 * If the code is provided, exchange it for a session.
 *
 * @param {Request} request
 * @returns {Promise<NextResponse>}
 */
export async function GET(request: Request): Promise<NextResponse> {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "/";

	if (code) {
		const supabase = await createServerClient();
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			// The redirect destination after a successful login is determined by the **Site URL**
			// in the Url Configuration of the Supabase administration screen.
			// Note that you will not be redirected to `redirect()` argument
			const baseUrl = getSiteUrl();
			return NextResponse.redirect(`${baseUrl}${next}`);
		}
	}

	// return the user to an error page with instructions
	return NextResponse.redirect(getSiteUrl("/auth/auth-code-error"));
}
