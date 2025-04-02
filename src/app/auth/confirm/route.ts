import type { EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { createServerClient } from "@/shared/lib/supabase/server";

/**
 * Auth confirmation endpoint handler for email verification
 *
 * This endpoint processes email verification links that are sent to users
 * when they sign up or request password recovery. When a user clicks on the
 * verification link in their email, they are directed to this endpoint.
 *
 * The handler validates the token from the email link against Supabase Auth,
 * and if valid, redirects the user to their intended destination.
 *
 * @param request - The incoming request containing token parameters
 * @returns A redirect response - either to the intended page on successful verification,
 *          or to an error page if verification fails
 */
export async function GET(request: NextRequest) {
	// Get parameters from URL
	const { searchParams } = new URL(request.url);
	const token_hash = searchParams.get("token_hash");
	const type = searchParams.get("type") as EmailOtpType | null;
	const next = searchParams.get("next") ?? "/";

	// Set the URL to redirect to
	const redirectTo = request.nextUrl.clone();
	redirectTo.pathname = next;
	redirectTo.searchParams.delete("token_hash");
	redirectTo.searchParams.delete("type");

	if (token_hash && type) {
		const supabase = await createServerClient();

		// Verify One Time Password
		const { error } = await supabase.auth.verifyOtp({ type, token_hash });

		if (!error) {
			redirectTo.searchParams.delete("next");
			return NextResponse.redirect(redirectTo);
		}
	}

	// エラーページへリダイレクト
	redirectTo.pathname = "/error";
	return NextResponse.redirect(redirectTo);
}
