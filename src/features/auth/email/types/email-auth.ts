import { z } from "zod";

export const EmailLoginSchema = z.object({
	email: z
		.string({ required_error: "Your email must be a string." })
		.min(1, "Please enter your email.")
		.email("The email address is badly formatted."),
	password: z
		.string({ required_error: "Your password must be a string." })
		.min(1, "Please enter your password.")
		.min(8, "Your password must have 8 characters or more."),
});
export type EmailLoginInput = z.infer<typeof EmailLoginSchema>;

export const EmailSignupSchema = z.object({
	email: z
		.string({ required_error: "Your email must be a string." })
		.min(1, "Please enter your email.")
		.email("The email address is badly formatted."),
	password: z
		.string({ required_error: "Your password must be a string." })
		.min(1, "Please enter your password.")
		.min(8, "Your password must have 8 characters or more."),
	username: z
		.string({ required_error: "Your username must be a string." })
		.min(1, "Please enter your username.")
		.max(50, "Your username must be less than 50 characters."),
});
export type EmailSignupInput = z.infer<typeof EmailSignupSchema>;
