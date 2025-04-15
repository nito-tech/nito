"use client";

import { useGetOrganizationBySlug } from "@/features/organizations/model/useOrganization";
import { useGetProjectByName } from "@/features/project/model/useProject";
import { ProjectMemberTable } from "@/features/project/ui/project-member-table/project-member-table";
import { PageTitle } from "@/shared/ui/page-title/page-title";
import { useTranslations } from "next-intl";
import { use } from "react";

interface Props {
	params: Promise<{ organizationSlug: string; projectName: string }>;
}

export default function ProjectMembersPage({ params }: Props) {
	const t = useTranslations();
	const { organizationSlug, projectName } = use(params);
	const {
		data: organization,
		isLoading: isOrganizationLoading,
		error: organizationError,
	} = useGetOrganizationBySlug({
		slug: organizationSlug,
	});

	const {
		data: project,
		isLoading: isProjectLoading,
		error: projectError,
	} = useGetProjectByName({
		organizationId: organization?.id ?? "",
		projectName,
		queryConfig: {
			enabled: !!organization,
		},
	});

	if (isOrganizationLoading || isProjectLoading) {
		return (
			<div className="container">
				<PageTitle
					title={t("Project.members")}
					description={t("Project.membersDescription")}
				/>
				<div className="mt-8">
					<div className="h-96 flex items-center justify-center">
						<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
					</div>
				</div>
			</div>
		);
	}

	if (organizationError || !organization) {
		return (
			<div className="container">
				<PageTitle
					title={t("Project.members")}
					description={t("Project.membersDescription")}
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

	if (projectError || !project) {
		return (
			<div className="container">
				<PageTitle
					title={t("Project.members")}
					description={t("Project.membersDescription")}
				/>
				<div className="mt-8">
					<div className="h-96 flex items-center justify-center">
						<div className="text-destructive">
							{t("Project.error.projectNotFound")}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container">
			<PageTitle
				title={t("Project.members")}
				description={t("Project.membersDescription")}
			/>
			<div className="mt-8">
				<ProjectMemberTable id={project.id} organizationId={organization.id} />
			</div>
		</div>
	);
}
