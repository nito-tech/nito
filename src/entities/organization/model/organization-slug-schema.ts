import { z } from "zod";

type OrganizationSlugTranslationFunction = (
	key:
		| "Organization.validation.slug.required"
		| "Organization.validation.slug.invalidChars"
		| "Organization.validation.slug.invalidFormat",
) => string;

/**
 * Schema for organization slug validation
 * @param t - Translation function for error messages
 * @returns Zod schema for organization slug
 * @remarks
 * - Allows alphanumeric characters (a-z, A-Z, 0-9) and hyphens
 * - Must start and end with an alphanumeric character
 * - Cannot contain spaces
 * - Case-sensitive: uppercase and lowercase characters are allowed
 */
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
