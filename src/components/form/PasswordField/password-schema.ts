import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_MAX_LENGTH = 128;

export type PasswordTranslationFunction = (
	key:
		| "Auth.validation.passwordRequired"
		| "Auth.validation.passwordMinLength"
		| "Auth.validation.passwordMaxLength",
) => string;

const createCustomErrorMap =
	(t: PasswordTranslationFunction): z.ZodErrorMap =>
	(issue) => {
		const fieldName = issue.path[0];

		switch (fieldName) {
			case "password":
				switch (issue.code) {
					// NOTE: Empty string doesn't trigger invalid_type error
					// case z.ZodIssueCode.invalid_type:
					// 	return { message: t("Auth.validation.passwordRequired") };
					case z.ZodIssueCode.too_small:
						return { message: t("Auth.validation.passwordMinLength") };
					case z.ZodIssueCode.too_big:
						return { message: t("Auth.validation.passwordMaxLength") };
					default:
						return { message: t("Auth.validation.passwordRequired") };
				}
			default:
				return { message: t("Auth.validation.passwordRequired") };
		}
	};

export const createPasswordSchema = (t: PasswordTranslationFunction) => {
	z.setErrorMap(createCustomErrorMap(t));
	return z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH);
};

export type PasswordSchemaType = z.infer<
	ReturnType<typeof createPasswordSchema>
>;
