"use server";

import { getTranslations } from "next-intl/server";
import { z } from "zod";

import { createServerClient } from "@/lib/supabase/server";

import {
	createEmailLoginSchema,
	createEmailSignupSchema,
} from "./schemas/auth-schema";
import type { EmailLoginInput, EmailSignupInput } from "./schemas/auth-schema";

export async function logInWithEmail(formData: EmailLoginInput) {
	const t = (key: string) => key; // No translation required on the server side
	const schema = createEmailLoginSchema(t);

	try {
		schema.parse(formData);
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error(error.errors[0].message);
		}
		throw error;
	}

	const supabase = await createServerClient();
	const { error } = await supabase.auth.signInWithPassword({
		email: formData.email,
		password: formData.password,
	});

	if (error) {
		throw new Error(error.message);
	}
}

/**
 * Check if the username already exists
 */
export async function checkUsernameExists(
	username: EmailSignupInput["username"],
) {
	const t = await getTranslations();
	const supabase = await createServerClient();

	const { data: existingProfile } = await supabase
		.from("profiles")
		.select("id")
		.eq("username", username)
		.single();

	if (existingProfile) {
		throw new Error(t("Auth.validation.usernameAlreadyExists"));
	}
}

export async function signUpWithEmail(formData: EmailSignupInput) {
	const t = (key: string) => key; // No translation required on the server side
	const schema = createEmailSignupSchema(t);

	try {
		// Validate the input
		schema.parse(formData);
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error(error.errors[0].message);
		}
		throw error;
	}

	const supabase = await createServerClient();

	// Sign up with email and password
	const { error: signUpError } = await supabase.auth.signUp({
		email: formData.email,
		password: formData.password,
		// Set email, username and display_name to public.profiles table
		options: {
			data: {
				username: formData.username,
				display_name: formData.username, // Set username as display_name by default
			},
		},
	});

	if (signUpError) {
		throw new Error(signUpError.message);
	}
}
