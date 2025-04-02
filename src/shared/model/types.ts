import type { z } from "zod";

import type {
	createEmailSchema,
	createPasswordSchema,
	createUsernameSchema,
} from "./schemas";

export type EmailSchema = z.infer<ReturnType<typeof createEmailSchema>>;

export type PasswordSchema = z.infer<ReturnType<typeof createPasswordSchema>>;

export type UsernameSchema = z.infer<ReturnType<typeof createUsernameSchema>>;
