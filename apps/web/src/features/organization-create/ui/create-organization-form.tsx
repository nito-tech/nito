"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { OrganizationNameField } from "@/entities/organization/ui/organization-name-field/organization-name-field";
import { OrganizationSlugField } from "@/entities/organization/ui/organization-slug-field/organization-slug-field";
import { Button } from "@/shared/ui/button";
import { Form } from "@/shared/ui/form";

import { useCreateOrganization } from "../api/useCreateOrganization";
import {
	type CreateOrganizationInput,
	CreateOrganizationSchema,
} from "../model/create-organization-schema";

export function CreateOrganizationForm() {
	const t = useTranslations();
	const router = useRouter();

	// TODO: Move to /{organizationId} page after successful creation
	const { mutate: createOrganization, isPending } = useCreateOrganization();

	return (
		<Form
			schema={CreateOrganizationSchema(t)}
			onSubmit={(data: CreateOrganizationInput) => createOrganization({ data })}
			aria-label={t("Organization.create.organization")}
		>
			{() => (
				<>
					<OrganizationNameField
						name="name"
						label={t("Organization.name")}
						disabled={isPending}
					/>
					<OrganizationSlugField
						name="slug"
						label={t("Organization.slug")}
						disabled={isPending}
					/>
					<Button type="submit">{t("Organization.create.organization")}</Button>
				</>
			)}
		</Form>
	);
}
