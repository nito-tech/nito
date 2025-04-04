import { z } from "zod";

import { CreateEmailSchema } from "@/entities/user/model/email-schema";
import { CreatePasswordSchema } from "@/entities/user/model/password-schema";
import { CreateUsernameSchema } from "@/entities/user/model/username-schema";

export const SignUpWithEmailSchema = (t: (key: string) => string) =>
	z.object({
		email: CreateEmailSchema(t),
		password: CreatePasswordSchema(t),
		username: CreateUsernameSchema(t),
	});

export type SignUpWithEmailInput = z.infer<
	ReturnType<typeof SignUpWithEmailSchema>
>;
