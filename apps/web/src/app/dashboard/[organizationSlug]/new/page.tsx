"use client";

import { useTranslations } from "next-intl";
import { use } from "react";

import { useGetOrganizationBySlug } from "@/features/organizations/model/useOrganization";
import { CreateProjectForm } from "@/features/project/ui/create-project-form/create-project-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

interface Props {
	params: Promise<{ organizationSlug: string }>;
}

export default function ProjectNewPage({ params }: Props) {
	const t = useTranslations("Project");

	const { organizationSlug } = use(params);
	const { data: organization } = useGetOrganizationBySlug({
		slug: organizationSlug,
	});

	if (!organization) {
		return <div>Organization not found</div>;
	}

	return (
		<div className="container mx-auto py-10">
			<Card>
				<CardHeader>
					<CardTitle>{t("create.project")}</CardTitle>
				</CardHeader>
				<CardContent>
					<CreateProjectForm organization={organization} />
				</CardContent>
			</Card>
		</div>
	);
}
