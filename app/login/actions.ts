"use server";

import { createServerClient } from "@/lib/supabase/server";
import type { Provider } from "@supabase/supabase-js";

import { getSiteUrl } from "@/lib/utils";
import type { EmailAuthInput } from "../signup/types/email-auth";

const redirectPath = "/dashboard";

export async function logInWithEmail(formData: EmailAuthInput) {
	const supabase = await createServerClient();
	const { error } = await supabase.auth.signInWithPassword({
		email: formData.email,
		password: formData.password,
	});

	if (error) {
		throw new Error(`Login error: ${error.message}`);
	}

	// return null //redirect(redirectPath);
}

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
