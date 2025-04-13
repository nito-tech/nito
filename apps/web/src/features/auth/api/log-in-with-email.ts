"use server";

import type { Session } from "@supabase/supabase-js";
import { z } from "zod";

import { createServerClient } from "@/shared/lib/supabase/server";

import {
	type LogInWithEmailInput,
	LogInWithEmailSchema,
} from "../model/log-in-with-email-schemas";

export const logInWithEmail = async ({
	data,
}: {
	data: LogInWithEmailInput;
}): Promise<Session> => {
	const t = (key: string) => key; // No translation required on the server side
	const schema = LogInWithEmailSchema(t);

	try {
		schema.parse(data);
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error(error.errors[0].message);
		}
		throw error;
	}

	const supabase = await createServerClient();

	const { data: response, error } = await supabase.auth.signInWithPassword({
		email: data.email,
		password: data.password,
	});

	if (error) {
		throw new Error(error.message);
	}

	return response.session;
};
