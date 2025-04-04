import { z } from "zod";

import { CreateEmailSchema } from "@/entities/user/model/email-schema";
import { CreatePasswordSchema } from "@/entities/user/model/password-schema";

export const LogInWithEmailSchema = (t: (key: string) => string) =>
	z.object({
		email: CreateEmailSchema(t),
		password: CreatePasswordSchema(t),
	});

export type LogInWithEmailInput = z.infer<
	ReturnType<typeof LogInWithEmailSchema>
>;
