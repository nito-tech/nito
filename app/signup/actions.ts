"use server";

import { createServerClient } from "@/lib/supabase/server";

import type { EmailSignUpInput } from "./types/email-sign-up";

export async function signUpWithEmail(formData: EmailSignUpInput) {
	const supabase = await createServerClient();

	const { error } = await supabase.auth.signUp(formData);

	if (error) {
		throw new Error("Sign up error");
	}

	return null;
}
