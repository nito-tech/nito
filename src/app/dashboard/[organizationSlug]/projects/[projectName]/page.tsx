"use client";

import { useTranslations } from "next-intl";
import { redirect, useParams } from "next/navigation";

import { useGetOrganizationBySlug } from "@/features/organizations/model/useOrganization";
import { useGetProjectByName } from "@/features/project/model/useProject";
import type { Organization, Project } from "@/shared/schema";
import { PageTitle } from "@/shared/ui/page-title/page-title";

export default function DashboardOrganizationSlugProjectsProjectNamePage() {
	const params = useParams();

	if (!params || !params.organizationSlug || !params.projectName) {
		redirect("/not-found");
	}

	const { data: organization, isPending: isOrganizationPending } =
		useGetOrganizationBySlug({
			slug: params.organizationSlug as Organization["slug"],
			queryConfig: {
				enabled: !!params.organizationSlug,
			},
		});

	const { data: project, isPending: isProjectPending } = useGetProjectByName({
		organizationId: organization?.id ?? "",
		projectName: params.projectName as Project["name"],
		queryConfig: {
			enabled: !!params.projectName,
		},
	});

	const t = useTranslations();

	if (isOrganizationPending || isProjectPending) {
		return <div>Loading...</div>;
	}

	if (!organization) {
		return <div>Organization not found</div>;
	}

	if (!project) {
		return <div>Project not found</div>;
	}

	return (
		<div className="container">
			<PageTitle title={project?.name ?? ""} />
		</div>
	);
}
