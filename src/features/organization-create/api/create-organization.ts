"use server";

import { z } from "zod";

import { createServerClient } from "@/shared/lib/supabase/server";

import {
	type CreateOrganizationInput,
	CreateOrganizationSchema,
} from "../model/create-organization-schema";

export const createOrganization = async ({
	data,
}: {
	data: CreateOrganizationInput;
}): Promise<null> => {
	const t = (key: string) => key; // No translation required on the server side
	const schema = CreateOrganizationSchema(t);

	try {
		schema.parse(data);
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error(error.errors[0].message);
		}
		throw error;
	}

	// Removing spaces from both ends
	const trimmedName = data.name.trim();

	// The leading spaces are prohibited by Zod, so only the trailing spaces are removed
	const trimmedSlug = data.slug.trim();

	const supabase = await createServerClient();
	const { data: response, error } = await supabase
		.from("organizations")
		.insert([
			{
				name: trimmedName,
				slug: trimmedSlug,
			},
		]);

	if (error) {
		throw new Error(error.message);
	}

	return response;
};
