import { z } from "zod";

import {
	createEmailSchema,
	createPasswordSchema,
	createUsernameSchema,
} from "@/shared/model/schemas";

export const SignUpWithEmailSchema = (t: (key: string) => string) =>
	z.object({
		email: createEmailSchema(t),
		password: createPasswordSchema(t),
		username: createUsernameSchema(t),
	});
