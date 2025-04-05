import { z } from "zod";

type OrganizationSlugTranslationFunction = (
	key:
		| "Organization.validation.slug.required"
		| "Organization.validation.slug.invalidChars"
		| "Organization.validation.slug.invalidFormat",
) => string;

export const OrganizationSlugSchema = (
	t: OrganizationSlugTranslationFunction,
) => {
	return z
		.string({ required_error: t("Organization.validation.slug.required") })
		.min(1, t("Organization.validation.slug.required"))
		.regex(/^[a-zA-Z0-9-]+$/, t("Organization.validation.slug.invalidChars"))
		.regex(
			/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/,
			t("Organization.validation.slug.invalidFormat"),
		);
};

export type OrganizationSlugInput = z.infer<
	ReturnType<typeof OrganizationSlugSchema>
>;
