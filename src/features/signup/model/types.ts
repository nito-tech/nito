import type { z } from "zod";

import type { SignUpWithEmailSchema } from "./schemas";

export type SignUpWithEmail = z.infer<ReturnType<typeof SignUpWithEmailSchema>>;
