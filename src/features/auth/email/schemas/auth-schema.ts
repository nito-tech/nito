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
	},
	username: {
		required: "Auth.validation.usernameRequired",
		minLength: "Auth.validation.usernameMinLength",
		maxLength: "Auth.validation.usernameMaxLength",
	},
} as const;

type TranslationFunction = (
	key:
		| "Auth.validation.emailRequired"
		| "Auth.validation.emailInvalid"
		| "Auth.validation.emailMinLength"
		| "Auth.validation.passwordRequired"
		| "Auth.validation.passwordMinLength"
		| "Auth.validation.usernameRequired"
		| "Auth.validation.usernameMinLength"
		| "Auth.validation.usernameMaxLength",
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
const emailSchema = z.string().min(1).email();
const passwordSchema = z.string().min(1).min(8);
const usernameSchema = z.string().min(1).max(50);

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
