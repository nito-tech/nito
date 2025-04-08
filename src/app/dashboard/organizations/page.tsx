"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

import { OrganizationList } from "@/features/organizations/ui/organization-list/organization-list";
import { Button } from "@/shared/ui/button";

export default function OrganizationsPage() {
	const t = useTranslations();

	return (
		<div className="container py-10">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Organizations</h1>
					<p className="text-muted-foreground">
						Manage your organizations and teams
					</p>
				</div>
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
