"use server";

import { createServerClient } from "@/lib/supabase/server";

import type { EmailSignupInput } from "./types/email-signup";

export async function signUpWithEmail(formData: EmailSignupInput) {
	const supabase = await createServerClient();

	const { error } = await supabase.auth.signUp(formData);

	if (error) {
		throw new Error("Sign up error");
	}

	return null;
}
