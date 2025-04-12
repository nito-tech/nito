import { z } from "zod";

type ProjectNameTranslationFunction = (
	key:
		| "Project.validation.nameRequired"
		| "Project.validation.nameMaxLength"
		| "Project.validation.nameFormat"
		| "Project.validation.nameNoSpaces",
) => string;

export const CreateProjectNameSchema = (t: ProjectNameTranslationFunction) =>
	z
		.string({ required_error: t("Project.validation.nameRequired") })
		.min(1, t("Project.validation.nameRequired"))
		.max(100, t("Project.validation.nameMaxLength"))
		.regex(/^[a-z0-9._-]+$/, t("Project.validation.nameFormat"))
		.refine((value) => !value.includes(" ") && !value.includes("　"), {
			message: t("Project.validation.nameNoSpaces"),
		});

export type CreateProjectNameInput = z.infer<
	ReturnType<typeof CreateProjectNameSchema>
>;
