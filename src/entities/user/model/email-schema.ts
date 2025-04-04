import { z } from "zod";

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

export type EmailInput = z.infer<ReturnType<typeof createEmailSchema>>;
