import { z } from "zod";

import { createUsernameSchema } from "@/components/form/UsernameField/UsernameField";
import { createEmailSchema, createPasswordSchema } from "@/types/schema";

export const SignUpWithEmailSchema = (t: (key: string) => string) =>
	z.object({
		email: createEmailSchema(t),
		password: createPasswordSchema(t),
		username: createUsernameSchema(t),
	});
