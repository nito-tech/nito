import { z } from "zod";

export type EmailTranslationFunction = (
	key:
		| "Auth.validation.emailRequired"
		| "Auth.validation.emailInvalid"
		| "Auth.validation.emailMinLength",
) => string;

const createCustomErrorMap =
	(t: EmailTranslationFunction): z.ZodErrorMap =>
	(issue) => {
		const fieldName = issue.path[0];

		switch (fieldName) {
			case "email":
				switch (issue.code) {
					case z.ZodIssueCode.invalid_type:
						return { message: t("Auth.validation.emailRequired") };
					case z.ZodIssueCode.too_small:
						return { message: t("Auth.validation.emailMinLength") };
					case z.ZodIssueCode.invalid_string:
						if (issue.validation === "email") {
							return { message: t("Auth.validation.emailInvalid") };
						}
						return { message: t("Auth.validation.emailRequired") };
					default:
						return { message: t("Auth.validation.emailRequired") };
				}
			default:
				return { message: t("Auth.validation.emailRequired") };
		}
	};

export const createEmailSchema = (t: EmailTranslationFunction) => {
	z.setErrorMap(createCustomErrorMap(t));
	return z.string().min(1).email();
};

export type EmailSchemaType = z.infer<ReturnType<typeof createEmailSchema>>;
