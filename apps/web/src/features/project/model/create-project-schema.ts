import { z } from "zod";

import { ProjectNameSchema } from "@/entities/project/model/project-name-scheama";

export const CreateProjectSchema = (t: (key: string) => string) =>
	z.object({
		name: ProjectNameSchema(t),
	});

export type CreateProjectInput = z.infer<
	ReturnType<typeof CreateProjectSchema>
>;
