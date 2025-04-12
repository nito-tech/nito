"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

import { OrganizationList } from "@/features/organizations/ui/organization-list/organization-list";
import { Button } from "@/shared/ui/button";
import { PageTitle } from "@/shared/ui/page-title/page-title";

export default function OrganizationsPage() {
	const t = useTranslations();

	return (
		<div className="container">
			<div className="flex items-center justify-between">
				<PageTitle
					title="Organizations"
					description="Manage your organizations and teams"
				/>
				<Button asChild>
					<Link href="/organizations/create">
						{t("Organization.create.organization")}
					</Link>
				</Button>
			</div>

			<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<OrganizationList />
			</div>
		</div>
	);
}
