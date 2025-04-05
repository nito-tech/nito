import { z } from "zod";

import { EmailSchema } from "@/entities/user/model/email-schema";
import { PasswordSchema } from "@/entities/user/model/password-schema";
import { UsernameSchema } from "@/entities/user/model/username-schema";

export const SignUpWithEmailSchema = (t: (key: string) => string) =>
	z.object({
		email: EmailSchema(t),
		password: PasswordSchema(t),
		username: UsernameSchema(t),
	});

export type SignUpWithEmailInput = z.infer<
	ReturnType<typeof SignUpWithEmailSchema>
>;
