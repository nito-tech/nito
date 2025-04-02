import { z } from "zod";

import {
	createEmailSchema,
	createPasswordSchema,
} from "@/shared/model/schemas";

export const LogInWithEmailSchema = (t: (key: string) => string) =>
	z.object({
		email: createEmailSchema(t),
		password: createPasswordSchema(t),
	});
