import { z } from "zod";

import { createEmailSchema, createPasswordSchema } from "@/types/schema";

export const LogInWithEmailSchema = (t: (key: string) => string) =>
	z.object({
		email: createEmailSchema(t),
		password: createPasswordSchema(t),
	});
