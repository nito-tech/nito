import { z } from "zod";

import { OrganizationNameSchema } from "@/entities/organization/model/organization-name-schema";
import { OrganizationSlugSchema } from "@/entities/organization/model/organization-slug-schema";

export const CreateOrganizationSchema = (t: (key: string) => string) =>
	z.object({
		name: OrganizationNameSchema(t),
		slug: OrganizationSlugSchema(t),
	});

export type CreateOrganizationInput = z.infer<
	ReturnType<typeof CreateOrganizationSchema>
>;
