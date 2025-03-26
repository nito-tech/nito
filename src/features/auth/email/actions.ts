"use server";

import { createServerClient } from "@/lib/supabase/server";

import type { EmailLoginInput, EmailSignupInput } from "./types/email-auth";

export async function logInWithEmail(formData: EmailLoginInput) {
	const supabase = await createServerClient();
	const { error } = await supabase.auth.signInWithPassword({
		email: formData.email,
		password: formData.password,
	});

	if (error) {
		throw new Error(error.message);
	}
}

export async function signUpWithEmail(formData: EmailSignupInput) {
	const supabase = await createServerClient();

	const { error } = await supabase.auth.signUp({
		email: formData.email,
		password: formData.password,
		options: {
			data: {
				username: formData.username,
			},
		},
	});

	if (error) {
		throw new Error(error.message);
	}
}
