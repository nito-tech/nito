import { z } from "zod";

type OrganizationNameTranslationFunction = (
	key:
		| "Organization.validation.nameRequired"
		| "Organization.validation.nameInvalidChars",
) => string;

export const OrganizationNameSchema = (
	t: OrganizationNameTranslationFunction,
) => {
	return z
		.string({ required_error: t("Organization.validation.nameRequired") })
		.min(1, t("Organization.validation.nameRequired"))
		.regex(/^[a-zA-Z0-9\s_-]+$/, t("Organization.validation.nameInvalidChars"));
};

export type OrganizationNameInput = z.infer<
	ReturnType<typeof OrganizationNameSchema>
>;
