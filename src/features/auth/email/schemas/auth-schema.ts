import { z } from "zod";

import type { EmailSignupInput } from "../types/validation";

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
	(issue, ctx) => {
		const fieldName = issue.path[0] as SchemaKey;

		console.log(issue);
		console.log(ctx);
		console.log(fieldName);

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

const createEmailSchema = (t: TranslationFunction) => z.string().min(1).email();

const createPasswordSchema = (t: TranslationFunction) =>
	z.string().min(1).min(8);

const createUsernameSchema = (t: TranslationFunction) =>
	z.string().min(1).max(50);

const emailLoginSchema = z.object({
	email: createEmailSchema(() => ""),
	password: createPasswordSchema(() => ""),
});

export type EmailLoginInput = z.infer<typeof emailLoginSchema>;

export const createEmailLoginSchema = (t: TranslationFunction) => {
	z.setErrorMap(createCustomErrorMap(t));
	return z.object({
		email: createEmailSchema(t),
		password: createPasswordSchema(t),
	});
};

export const createEmailSignupSchema = (t: TranslationFunction) => {
	z.setErrorMap(createCustomErrorMap(t));
	return z.object({
		email: createEmailSchema(t),
		password: createPasswordSchema(t),
		username: createUsernameSchema(t),
	}) satisfies z.ZodType<EmailSignupInput>;
};
