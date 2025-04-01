"use server";

import type { Session } from "@supabase/supabase-js";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

import {
	type EmailSchema,
	createEmailSchema,
} from "@/components/form/EmailField/email-schema";
import {
	type PasswordSchema,
	createPasswordSchema,
} from "@/components/form/PasswordField/password-schema";
import {
	type UsernameSchemaType,
	createUsernameSchema,
} from "@/components/form/UsernameField/username-schema";
import { createServerClient } from "@/lib/supabase/server";

export async function logInWithEmail(formData: {
	email: EmailSchema;
	password: PasswordSchema;
}): Promise<Session> {
	const t = (key: string) => key; // No translation required on the server side
	const schema = z.object({
		email: createEmailSchema(t),
		password: createPasswordSchema(t),
	});

	try {
		schema.parse(formData);
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error(error.errors[0].message);
		}
		throw error;
	}

	const supabase = await createServerClient();
	const { data, error } = await supabase.auth.signInWithPassword({
		email: formData.email,
		password: formData.password,
	});

	if (error) {
		throw new Error(error.message);
	}

	return data.session;
}

/**
 * Check if the username already exists
 */
export async function checkUsernameExists(username: UsernameSchemaType) {
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

export async function signUpWithEmail(formData: {
	email: EmailSchema;
	password: PasswordSchema;
	username: UsernameSchemaType;
}) {
	const t = (key: string) => key; // No translation required on the server side
	const schema = z.object({
		email: createEmailSchema(t),
		password: createPasswordSchema(t),
		username: createUsernameSchema(t),
	});

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
		// Set email, username and display_name to public.profiles table
		options: {
			data: {
				username: formData.username,
				display_name: formData.username, // Set username as display_name by default
			},
		},
	});

	if (error) {
		throw new Error(error.message);
	}
}
