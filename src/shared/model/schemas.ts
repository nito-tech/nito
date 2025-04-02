import { z } from "zod";

// MARK: - Email
type EmailTranslationFunction = (
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

// MARK: - Password

export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_MAX_LENGTH = 128;

type PasswordTranslationFunction = (
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

// MARK: - Username

type UsernameTranslationFunction = (
	key:
		| "Auth.validation.usernameRequired"
		| "Auth.validation.usernameMinLength"
		| "Auth.validation.usernameMaxLength"
		| "Auth.validation.usernameInvalidChars"
		| "Auth.validation.usernameReserved",
	// | "Auth.validation.usernameAlreadyExists",
) => string;

export const USERNAME_MAX_LENGTH = 50;

export const createUsernameSchema = (t: UsernameTranslationFunction) => {
	return z
		.string({ required_error: t("Auth.validation.usernameRequired") })
		.min(1, { message: t("Auth.validation.usernameMinLength") })
		.max(USERNAME_MAX_LENGTH, {
			message: t("Auth.validation.usernameMaxLength"),
		})
		.transform((val) => val.toLowerCase())
		.superRefine((val, ctx) => {
			if (val.length === 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: t("Auth.validation.usernameRequired"),
				});
				return;
			}

			if (!/^[a-z0-9_][a-z0-9_]*$/.test(val)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: t("Auth.validation.usernameInvalidChars"),
				});
				return;
			}

			if (
				/^(admin|root|system|user|test|guest|anonymous|null|undefined|true|false)$/.test(
					val,
				)
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: t("Auth.validation.usernameReserved"),
				});
				return;
			}
		});
};
