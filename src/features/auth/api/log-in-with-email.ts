"use server";

import type { Session } from "@supabase/supabase-js";
import { z } from "zod";

import { createServerClient } from "@/lib/supabase/server";

import { LogInWithEmailSchema } from "../model/schema";
import type { LogInWithEmail } from "../model/types";

export const logInWithEmail = async ({
	data,
}: {
	data: LogInWithEmail;
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
