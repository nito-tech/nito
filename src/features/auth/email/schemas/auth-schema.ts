import { z } from "zod";

export type TranslationFunction = (
	key:
		| "Auth.validation.emailRequired"
		| "Auth.validation.emailInvalid"
		| "Auth.validation.emailMinLength"
		| "Auth.validation.passwordRequired"
		| "Auth.validation.passwordMinLength"
		| "Auth.validation.passwordMaxLength"
		| "Auth.validation.usernameRequired"
		| "Auth.validation.usernameMinLength"
		| "Auth.validation.usernameMaxLength"
		| "Auth.validation.usernameInvalidChars"
		| "Auth.validation.usernameStartWithNumber"
		| "Auth.validation.usernameStartWithUnderscore"
		| "Auth.validation.usernameEndWithUnderscore"
		| "Auth.validation.usernameReserved",
) => string;

const createCustomErrorMap =
	(t: TranslationFunction): z.ZodErrorMap =>
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

			case "username":
				switch (issue.code) {
					case z.ZodIssueCode.invalid_type:
						return { message: t("Auth.validation.usernameRequired") };
					case z.ZodIssueCode.too_small:
						return { message: t("Auth.validation.usernameMinLength") };
					case z.ZodIssueCode.too_big:
						return { message: t("Auth.validation.usernameMaxLength") };
					case z.ZodIssueCode.custom:
						return {
							message: t(
								`Auth.validation.${
									issue.params?.code as
										| "usernameRequired"
										| "usernameInvalidChars"
										| "usernameReserved"
								}`,
							),
						};
					default:
						return { message: t("Auth.validation.usernameRequired") };
				}

			default:
				return { message: t("Auth.validation.emailRequired") };
		}
	};

// ------------------------------------
// Auth Field Schema
// ------------------------------------
export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_MAX_LENGTH = 128;
export const USERNAME_MAX_LENGTH = 50;

const emailSchema = z.string().min(1).email();
const passwordSchema = z
	.string()
	.min(PASSWORD_MIN_LENGTH)
	.max(PASSWORD_MAX_LENGTH);
export const usernameSchema = (t: TranslationFunction) =>
	z
		.string()
		.min(1)
		.max(USERNAME_MAX_LENGTH)
		.transform((val) => val.toLowerCase())
		.superRefine((val, ctx) => {
			if (val.length === 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					params: { code: "usernameRequired" },
				});
				return;
			}

			if (!/^[a-z0-9_][a-z0-9_]*$/.test(val)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					params: { code: "usernameInvalidChars" },
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
					params: { code: "usernameReserved" },
				});
				return;
			}
		});

// ------------------------------------
// Email Login Schema
// ------------------------------------
export const createEmailLoginSchema = (t: TranslationFunction) => {
	z.setErrorMap(createCustomErrorMap(t));
	return z.object({
		email: emailSchema,
		password: passwordSchema,
	});
};

export type EmailLoginInput = z.infer<
	ReturnType<typeof createEmailLoginSchema>
>;

// ------------------------------------
// Email Signup Schema
// ------------------------------------
export const createEmailSignupSchema = (t: TranslationFunction) => {
	z.setErrorMap(createCustomErrorMap(t));
	return z.object({
		email: emailSchema,
		password: passwordSchema,
		username: usernameSchema(t),
	});
};

export type EmailSignupInput = z.infer<
	ReturnType<typeof createEmailSignupSchema>
>;
