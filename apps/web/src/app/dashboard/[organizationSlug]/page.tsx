"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";

import { useGetOrganizationBySlug } from "@/features/organizations/model/useOrganization";
import { useGetProjects } from "@/features/project/model/useProject";
import ProjectDataTable from "@/features/project/ui/project-data-table/project-data-table";
import type { Organization } from "@/shared/schema";
import { Button } from "@/shared/ui/button";
import { PageTitle } from "@/shared/ui/page-title/page-title";

export default function DashboardOrganizationSlugPage() {
	const params = useParams();

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
		<div className="container space-y-4">
			<PageTitle
				title={organization.name}
				description={organization.description ?? ""}
			/>
			<div className="flex justify-end">
				<Link href={`/dashboard/${params.organizationSlug}/new`}>
					<Button>{t("Project.create.project")}</Button>
				</Link>
			</div>
			<ProjectDataTable projects={projects ?? []} />
		</div>
	);
}
