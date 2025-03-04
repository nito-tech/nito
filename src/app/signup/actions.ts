"use server";

import { createServerClient } from "@/lib/supabase/server";

import type { EmailAuthInput } from "./types/email-auth";

export async function signUpWithEmail(formData: EmailAuthInput) {
	const supabase = await createServerClient();

	const { error } = await supabase.auth.signUp(formData);

	if (error) {
		throw new Error("Sign up error");
	}

	return null;
}
