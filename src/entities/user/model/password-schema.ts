import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_MAX_LENGTH = 128;

export type PasswordTranslationFunction = (
	key:
		| "Auth.validation.passwordRequired"
		| "Auth.validation.passwordMinLength"
		| "Auth.validation.passwordMaxLength",
) => string;

export const createPasswordSchema = (t: PasswordTranslationFunction) => {
	return z
		.string({ required_error: t("Auth.validation.passwordRequired") })
		.min(PASSWORD_MIN_LENGTH, {
			message: t("Auth.validation.passwordMinLength"),
		})
		.max(PASSWORD_MAX_LENGTH, {
			message: t("Auth.validation.passwordMaxLength"),
		});
};

export type PasswordInput = z.infer<ReturnType<typeof createPasswordSchema>>;
