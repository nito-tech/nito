import { z } from "zod";

import { createEmailSchema } from "@/entities/user/model/email-schema";
import { createPasswordSchema } from "@/entities/user/model/password-schema";

export const LogInWithEmailSchema = (t: (key: string) => string) =>
	z.object({
		email: createEmailSchema(t),
		password: createPasswordSchema(t),
	});

export type LogInWithEmailInput = z.infer<
	ReturnType<typeof LogInWithEmailSchema>
>;
