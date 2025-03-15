import { NextResponse } from "next/server";

import { createServerClient } from "@/lib/supabase/server";
import { getSiteUrl } from "@/lib/utils";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "/";

	if (code) {
		const supabase = await createServerClient();
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			const baseUrl = getSiteUrl();
			return NextResponse.redirect(`${baseUrl}${next}`);
		}
	}

	// return the user to an error page with instructions
	return NextResponse.redirect(getSiteUrl("/auth/auth-code-error"));
}
