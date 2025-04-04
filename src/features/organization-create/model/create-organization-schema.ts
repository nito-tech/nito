import { z } from "zod";

export const CreateOrganizationSchema = (t: (key: string) => string) =>
	z.object({
		name: z
			.string({ required_error: t("Organization.validation.nameRequired") })
			.min(1, t("Organization.validation.nameRequired"))
			.regex(
				/^[a-zA-Z0-9\s_-]+$/,
				t("Organization.validation.nameInvalidChars"),
			),
	});

export type CreateOrganizationInput = z.infer<
	ReturnType<typeof CreateOrganizationSchema>
>;
