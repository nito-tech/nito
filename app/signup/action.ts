"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createServerClient } from "@/lib/supabase/server";
import type { LoginData } from "./components/EmailSignup";

export async function signup(formData: LoginData) {
	const supabase = await createServerClient();

	const { error } = await supabase.auth.signUp(formData);

	if (error) {
		// TODO: Show error message by Alert or Toast
		// redirect("/error");
		console.error("Sign up error:", error);
		return null;
	}

	// Ensure that the correct user status (logged in) is displayed on the redirected home page after signing up
	revalidatePath("/", "layout");

	redirect("/");
}
