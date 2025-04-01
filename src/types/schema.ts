import { z } from "zod";

// MARK: - Email
export type EmailTranslationFunction = (
	key:
		| "Auth.validation.emailRequired"
		| "Auth.validation.emailInvalid"
		| "Auth.validation.emailMinLength",
) => string;

export const createEmailSchema = (t: EmailTranslationFunction) => {
	return z
		.string({ required_error: t("Auth.validation.emailInvalid") })
		.min(1, { message: t("Auth.validation.emailMinLength") })
		.email({ message: t("Auth.validation.emailInvalid") });
};

export type EmailSchema = z.infer<ReturnType<typeof createEmailSchema>>;

// MARK: - Password

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

export type PasswordSchema = z.infer<ReturnType<typeof createPasswordSchema>>;
