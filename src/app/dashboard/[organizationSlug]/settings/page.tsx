"use client";

import { useTranslations } from "next-intl";
import { redirect, useParams } from "next/navigation";

import { useGetOrganizationBySlug } from "@/features/organizations/model/useOrganization";
import { useGetProjects } from "@/features/project/model/useProject";
import type { Organization } from "@/shared/schema";
import { PageTitle } from "@/shared/ui/page-title/page-title";

export default function DashboardOrganizationSlugSettingsPage() {
	const params = useParams();

	console.log(params);

	if (!params || !params.organizationSlug) {
		redirect("/not-found");
	}

	const { data: organization, isPending: isOrganizationPending } =
		useGetOrganizationBySlug({
			slug: params.organizationSlug as Organization["slug"],
			queryConfig: {
				enabled: !!params.organizationSlug,
			},
		});

	const { data: projects, isPending: isProjectsPending } = useGetProjects({
		organizationId: organization?.id ?? "",
		queryConfig: {
			enabled: !!organization,
		},
	});

	const t = useTranslations();

	if (isOrganizationPending || isProjectsPending) {
		return <div>Loading...</div>;
	}

	if (!organization) {
		return <div>Organization not found</div>;
	}

	return (
		<div className="container">
			<PageTitle title={"Settings"} />
		</div>
	);
}
