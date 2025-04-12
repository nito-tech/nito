import { z } from "zod";

import { EmailSchema } from "@/entities/user/model/email-schema";
import { PasswordSchema } from "@/entities/user/model/password-schema";

export const LogInWithEmailSchema = (t: (key: string) => string) =>
	z.object({
		email: EmailSchema(t),
		password: PasswordSchema(t),
	});

export type LogInWithEmailInput = z.infer<
	ReturnType<typeof LogInWithEmailSchema>
>;
