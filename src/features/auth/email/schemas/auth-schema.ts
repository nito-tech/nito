import { z } from "zod";

const schemaErrors = {
	email: {
		required: "Auth.validation.emailRequired",
		invalid: "Auth.validation.emailInvalid",
		minLength: "Auth.validation.emailMinLength",
	},
	password: {
		required: "Auth.validation.passwordRequired",
		minLength: "Auth.validation.passwordMinLength",
		maxLength: "Auth.validation.passwordMaxLength",
	},
	username: {
		required: "Auth.validation.usernameRequired",
		minLength: "Auth.validation.usernameMinLength",
		maxLength: "Auth.validation.usernameMaxLength",
		invalidChars: "Auth.validation.usernameInvalidChars",
		startWithNumber: "Auth.validation.usernameStartWithNumber",
		startWithUnderscore: "Auth.validation.usernameStartWithUnderscore",
		endWithUnderscore: "Auth.validation.usernameEndWithUnderscore",
		reserved: "Auth.validation.usernameReserved",
	},
} as const;

type TranslationFunction = (
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

type SchemaKey = keyof typeof schemaErrors;

const createCustomErrorMap =
	(t: TranslationFunction): z.ZodErrorMap =>
	(issue) => {
		const fieldName = issue.path[0] as SchemaKey;

		switch (fieldName) {
			case "email":
				switch (issue.code) {
					case z.ZodIssueCode.invalid_type:
						return { message: t(schemaErrors.email.required) };
					case z.ZodIssueCode.too_small:
						return { message: t(schemaErrors.email.minLength) };
					case z.ZodIssueCode.invalid_string:
						if (issue.validation === "email") {
							return { message: t(schemaErrors.email.invalid) };
						}
						return { message: t(schemaErrors.email.required) };
					default:
						return { message: t(schemaErrors.email.required) };
				}

			case "password":
				switch (issue.code) {
					case z.ZodIssueCode.invalid_type:
						return { message: t(schemaErrors.password.required) };
					case z.ZodIssueCode.too_small:
						return { message: t(schemaErrors.password.minLength) };
					case z.ZodIssueCode.too_big:
						return { message: t(schemaErrors.password.maxLength) };
					default:
						return { message: t(schemaErrors.password.required) };
				}

			case "username":
				switch (issue.code) {
					case z.ZodIssueCode.invalid_type:
						return { message: t(schemaErrors.username.required) };
					case z.ZodIssueCode.too_small:
						return { message: t(schemaErrors.username.minLength) };
					case z.ZodIssueCode.too_big:
						return { message: t(schemaErrors.username.maxLength) };
					case z.ZodIssueCode.custom:
						return {
							message: t(
								schemaErrors.username[
									issue.params?.code as keyof typeof schemaErrors.username
								],
							),
						};
					default:
						return { message: t(schemaErrors.username.required) };
				}

			default:
				return { message: t(schemaErrors.email.required) };
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
export const usernameSchema = z
	.string()
	.min(1)
	.max(USERNAME_MAX_LENGTH)
	.transform((val) => val.toLowerCase())
	.superRefine((val, ctx) => {
		if (val.length === 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Auth.validation.usernameRequired",
				params: { code: "required" },
			});
			return;
		}
		if (!/^[a-z0-9_][a-z0-9_]*$/.test(val)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Auth.validation.usernameInvalidChars",
				params: { code: "invalidChars" },
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
				message: "Auth.validation.usernameReserved",
				params: { code: "reserved" },
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
		username: usernameSchema,
	});
};

export type EmailSignupInput = z.infer<
	ReturnType<typeof createEmailSignupSchema>
>;
