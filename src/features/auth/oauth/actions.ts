"use server";

import type { Provider } from "@supabase/supabase-js";

import { createServerClient } from "@/lib/supabase/server";
import { getSiteUrl } from "@/lib/utils";

const redirectPath = "/dashboard";

export async function logInWithOAuth(provider: Provider) {
	const supabase = await createServerClient();
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo: `${getSiteUrl("/auth/callback")}?next=${redirectPath}`,
		},
	});

	if (error) {
		throw new Error(`Login error: ${error.message}`);
	}

	return data.url;
}
