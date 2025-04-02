import type { z } from "zod";

import type { SignUpWithEmailSchema } from "./schema";

export type SignUpWithEmail = z.infer<ReturnType<typeof SignUpWithEmailSchema>>;
