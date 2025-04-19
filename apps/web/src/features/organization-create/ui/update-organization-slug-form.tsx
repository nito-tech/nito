"use client";

import type { SelectOrganization } from "@nito/db";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

import { OrganizationSlugSchema } from "@/entities/organization/model/organization-slug-schema";
import { useOrganizationStore } from "@/entities/organization/model/organization-store";
import { OrganizationSlugField } from "@/entities/organization/ui/organization-slug-field/organization-slug-field";
import { useUpdateOrganization } from "@/features/organizations/model/useOrganization";

import { Button } from "@/shared/ui/button";
import { Form } from "@/shared/ui/form";

interface Props {
	organization: Pick<SelectOrganization, "id" | "slug">;
	className?: string;
}

/**
 * Form for updating organization slug
 */
export function UpdateOrganizationSlugForm({ organization, className }: Props) {
	const t = useTranslations();
	const router = useRouter();
	const { setCurrentOrganization, currentOrganization } =
		useOrganizationStore();

	const schema = z.object({
		slug: OrganizationSlugSchema(t),
	});
	type UpdateOrganizationSlugInput = z.infer<typeof schema>;

	const { mutate: updateOrganization, isPending } = useUpdateOrganization({
		organization: { id: organization.id },
	});

	const onSubmit = (data: UpdateOrganizationSlugInput) => {
		if (!currentOrganization) return;

		updateOrganization(
			{ id: organization.id, slug: data.slug },
			{
				onSuccess: () => {
					toast.success(t("Organization.settings.updateSuccess"));

					// Update store with new slug
					setCurrentOrganization({
						...currentOrganization,
						slug: data.slug,
					});

					// Navigate to new URL
					router.push(`/dashboard/${data.slug}/settings`);
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
					slug: organization.slug,
				},
			}}
			className={className}
			aria-label={t("Organization.settings.title")}
		>
			{() => (
				<>
					<OrganizationSlugField
						name="slug"
						label={t("Organization.slug")}
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
