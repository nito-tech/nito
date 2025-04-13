"use client";

import { useTranslations } from "next-intl";
import { redirect, useParams } from "next/navigation";

import CycleTimeDashboard from "@/features/github/components/cycle-time";
import GitHubConnectRepositoryCard from "@/features/github/components/github-connect-repository-card";
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

			<CycleTimeDashboard />

			<div>
				<p className="text-sm text-muted-foreground">
					・Select repository to fetch commit logs and analyze.
				</p>
				<p className="text-sm text-muted-foreground">
					・This application requires access to your GitHub repositories.
				</p>
				<p className="text-sm text-muted-foreground">
					・You can revoke access at any time from your GitHub settings.
				</p>
			</div>

			<div className="space-y-4">
				<GitHubConnectRepositoryCard />
				{/* <GitLabConnectRepositoryCard />
				<BitbucketConnectRepositoryCard /> */}
			</div>
		</div>
	);
}
