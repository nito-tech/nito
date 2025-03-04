"use server";

import type { EmailAuthInput } from "@/features/auth/email/types/email-auth";
import { createServerClient } from "@/lib/supabase/server";

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

export async function signUpWithEmail(formData: EmailAuthInput) {
	const supabase = await createServerClient();

	const { error } = await supabase.auth.signUp(formData);

	if (error) {
		throw new Error("Sign up error");
	}

	return null;
}
