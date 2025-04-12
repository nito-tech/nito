"use client";

import { useTranslations } from "next-intl";
import { use } from "react";

import { UpdateOrganizationNameForm } from "@/features/organization-create/ui/update-organization-name-form";
import { UpdateOrganizationSlugForm } from "@/features/organization-create/ui/update-organization-slug-form";
import { useGetOrganizationBySlug } from "@/features/organizations/model/useOrganization";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { PageTitle } from "@/shared/ui/page-title/page-title";

interface Props {
	params: Promise<{ organizationSlug: string }>;
}

export default function OrganizationSettingsPage({ params }: Props) {
	const t = useTranslations();
	const { organizationSlug } = use(params);
	const {
		data: organization,
		isLoading,
		error,
	} = useGetOrganizationBySlug({
		slug: organizationSlug,
	});

	if (isLoading) {
		return (
			<div className="container mx-auto py-8">
				<PageTitle
					title={t("Organization.settings.title")}
					description={t("Organization.settings.description")}
				/>
				<div className="mt-8">
					<div className="h-96 flex items-center justify-center">
						<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
					</div>
				</div>
			</div>
		);
	}

	if (error || !organization) {
		return (
			<div className="container mx-auto py-8">
				<PageTitle
					title={t("Organization.settings.title")}
					description={t("Organization.settings.description")}
				/>
				<div className="mt-8">
					<div className="h-96 flex items-center justify-center">
						<div className="text-destructive">
							{t("Organization.error.organizationNotFound")}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-8">
			<PageTitle
				title={t("Organization.settings.title")}
				description={t("Organization.settings.description")}
			/>
			<div className="mt-8 space-y-8">
				<Card>
					<CardHeader>
						<CardTitle>{t("Organization.name")}</CardTitle>
					</CardHeader>
					<CardContent>
						<UpdateOrganizationNameForm organization={organization} />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>{t("Organization.slug")}</CardTitle>
					</CardHeader>
					<CardContent>
						<UpdateOrganizationSlugForm organization={organization} />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
