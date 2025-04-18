"use client";

import type { SelectOrganization } from "@nito/db";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { z } from "zod";

import { OrganizationNameSchema } from "@/entities/organization/model/organization-name-schema";
import { OrganizationNameField } from "@/entities/organization/ui/organization-name-field/organization-name-field";
import { useUpdateOrganization } from "@/features/organizations/model/useOrganization";
import { Button } from "@/shared/ui/button";
import { Form } from "@/shared/ui/form";
import { useOrganizationStore } from "#entities/organization/model/organization-store";

interface Props {
	organization: Pick<SelectOrganization, "id" | "name">;
	className?: string;
}

/**
 * Form for updating organization name
 */
export function UpdateOrganizationNameForm({ organization, className }: Props) {
	const t = useTranslations();

	const schema = z.object({
		name: OrganizationNameSchema(t),
	});
	type UpdateOrganizationNameInput = z.infer<typeof schema>;

	const { setCurrentOrganization } = useOrganizationStore();

	const { mutate: updateOrganization, isPending } = useUpdateOrganization({
		organization: { id: organization.id },
	});

	const onSubmit = (data: UpdateOrganizationNameInput) => {
		updateOrganization(
			{ id: organization.id, name: data.name },
			{
				onSuccess: (updatedOrganization) => {
					setCurrentOrganization(updatedOrganization);
					toast.success(t("Organization.settings.updateSuccess"));
				},
				onError: () => {
					toast.error(t("Organization.settings.updateError"));
				},
			},
		);
	};

	return (
		<Form
			schema={schema}
			onSubmit={onSubmit}
			options={{
				defaultValues: {
					name: organization.name,
				},
			}}
			className={className}
			aria-label={t("Organization.settings.title")}
		>
			{() => (
				<>
					<OrganizationNameField
						name="name"
						label={t("Organization.name")}
						// description={t("Organization.settings.nameDescription")}
						placeholder={t("Organization.settings.namePlaceholder")}
						disabled={isPending}
					/>
					<div className="mt-6 flex justify-end">
						<Button type="submit" disabled={isPending}>
							{t("Action.save")}
						</Button>
					</div>
				</>
			)}
		</Form>
	);
}
