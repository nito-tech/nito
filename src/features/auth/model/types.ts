import type { z } from "zod";

import type { LogInWithEmailSchema } from "./schemas";

export type LogInWithEmail = z.infer<ReturnType<typeof LogInWithEmailSchema>>;
