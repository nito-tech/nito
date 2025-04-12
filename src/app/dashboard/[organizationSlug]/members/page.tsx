"use client";

import { useGetOrganizationBySlug } from "@/features/organizations/model/useOrganization";
import { MemberList } from "@/features/organizations/ui/member-list/member-list";
import { PageTitle } from "@/shared/ui/page-title/page-title";
import { useTranslations } from "next-intl";
import { use } from "react";

interface Props {
	params: Promise<{ organizationSlug: string }>;
}

export default function OrganizationMembersPage({ params }: Props) {
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
					title={t("Organization.members")}
					description={t("Organization.membersDescription")}
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
					title={t("Organization.members")}
					description={t("Organization.membersDescription")}
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
				title={t("Organization.members")}
				description={t("Organization.membersDescription")}
			/>
			<div className="mt-8">
				<MemberList organization={organization} />
			</div>
		</div>
	);
}
