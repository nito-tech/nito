"use server";

import { createServerClient } from "@/lib/supabase/server";
import { z } from "zod";

import { SignUpWithEmailSchema } from "../model/schemas";
import type { SignUpWithEmail } from "../model/types";

export async function signUpWithEmail(data: SignUpWithEmail) {
	const t = (key: string) => key; // No translation required on the server side
	const schema = SignUpWithEmailSchema(t);

	try {
		schema.parse(data);
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error(error.errors[0].message);
		}
		throw error;
	}

	const supabase = await createServerClient();

	const { error } = await supabase.auth.signUp({
		email: data.email,
		password: data.password,
		// Set email, username and display_name to public.profiles table
		options: {
			data: {
				username: data.username,
				display_name: data.username, // Set username as display_name by default
			},
		},
	});

	if (error) {
		throw new Error(error.message);
	}
}
