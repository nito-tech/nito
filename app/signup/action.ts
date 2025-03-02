"use server";

import { createServerClient } from "@/lib/supabase/server";
import type { LoginData } from "./components/EmailSignup";

export async function signup(formData: LoginData) {
	const supabase = await createServerClient();

	const { error } = await supabase.auth.signUp(formData);

	if (error) {
		throw new Error("Sign up error");
	}

	return null;
}
