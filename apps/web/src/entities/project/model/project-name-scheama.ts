import { z } from "zod";

type ProjectNameTranslationFunction = (
	key:
		| "Project.validation.name.required"
		| "Project.validation.name.maxLength"
		| "Project.validation.name.format"
		| "Project.validation.name.noSpaces",
) => string;

export const ProjectNameSchema = (t: ProjectNameTranslationFunction) => {
	const noSpacesSchema = z
		.string()
		.refine((value) => !value.includes(" ") && !value.includes("　"), {
			message: t("Project.validation.name.noSpaces"),
		});

	const formatSchema = z
		.string()
		.regex(/^[a-z0-9._-]+$/, t("Project.validation.name.format"));

	return z
		.string({ required_error: t("Project.validation.name.required") })
		.min(1, t("Project.validation.name.required"))
		.max(100, t("Project.validation.name.maxLength"))
		.pipe(noSpacesSchema)
		.pipe(formatSchema);
};

export type ProjectNameInput = z.infer<ReturnType<typeof ProjectNameSchema>>;
