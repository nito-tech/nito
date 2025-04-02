import type { z } from "zod";

import type { LogInWithEmailSchema } from "./schema";

export type LogInWithEmail = z.infer<ReturnType<typeof LogInWithEmailSchema>>;
