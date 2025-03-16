"use server";

import type { Provider } from "@supabase/supabase-js";

import { createServerClient } from "@/lib/supabase/server";
import { getSiteUrl } from "@/lib/utils";

const redirectPath = "/dashboard";

/**
 * Log in using Supabase's OAuth
 *
 * The redirect destination after a successful login is determined by the **Site URL**
 * in the Url Configuration of the Supabase administration screen.
 * Note that you will not be redirected to `redirectTo`
 *
 * @see https://supabase.com/dashboard/project/fnounbnxrzddmcwoykpd/auth/url-configuration
 */
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
