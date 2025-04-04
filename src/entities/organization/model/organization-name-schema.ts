import { z } from "zod";

type OrganizationNameTranslationFunction = (
	key: "Organization.validation.nameRequired",
) => string;

export const CreateOrganizationNameSchema = (
	t: OrganizationNameTranslationFunction,
) => {
	return z
		.string({ required_error: t("Organization.validation.nameRequired") })
		.min(1, t("Organization.validation.nameRequired"));
};

export type CreateOrganizationNameInput = z.infer<
	ReturnType<typeof CreateOrganizationNameSchema>
>;
