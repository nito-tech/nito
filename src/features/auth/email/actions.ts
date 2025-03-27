"use server";

import { createServerClient } from "@/lib/supabase/server";
import { z } from "zod";
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
