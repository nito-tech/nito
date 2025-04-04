import { z } from "zod";

import { createEmailSchema } from "@/entities/user/model/email-schema";
import { createPasswordSchema } from "@/entities/user/model/password-schema";
import { createUsernameSchema } from "@/entities/user/model/username-schema";

export const SignUpWithEmailSchema = (t: (key: string) => string) =>
	z.object({
		email: createEmailSchema(t),
		password: createPasswordSchema(t),
		username: createUsernameSchema(t),
	});

export type SignUpWithEmailInput = z.infer<
	ReturnType<typeof SignUpWithEmailSchema>
>;
