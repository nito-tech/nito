import { z } from "zod";

export const EmailAuthSchema = z.object({
	email: z
		.string({ required_error: "Your email must be a string." })
		.min(1, "Please enter your email.")
		.email("The email address is badly formatted."),
	password: z
		.string({ required_error: "Your password must be a string." })
		.min(1, "Please enter your password.")
		.min(8, "Your password must have 8 characters or more."),
});

export type EmailAuthInput = z.infer<typeof EmailAuthSchema>;
