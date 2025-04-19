"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

import { Skeleton } from "@/shared/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/ui/table";

import { useGetOrganizations } from "../../model/useOrganization";

/**
 * Component that displays a list of organizations
 */
export function OrganizationList() {
	const t = useTranslations();
	const {
		data: organizations,
		isLoading,
		error,
	} = useGetOrganizations({
		queryConfig: {
			select: (data) => data.organizations,
		},
	});

	if (error) {
		return (
			<div className="text-destructive">
				{t("Organization.error.failedToLoadOrganizations")}
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="space-y-4">
				<Skeleton className="h-8 w-full" />
				<Skeleton className="h-8 w-full" />
				<Skeleton className="h-8 w-full" />
			</div>
		);
	}

	if (!organizations?.length) {
		return (
			<div className="text-muted-foreground">
				{t("Organization.noOrganizations")}
			</div>
		);
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>{t("Organization.name")}</TableHead>
					<TableHead>{t("Organization.slug")}</TableHead>
					<TableHead>{t("Organization.createdAt")}</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{organizations.map((organization) => (
					<TableRow key={organization.id}>
						<TableCell>
							<Link
								href={`/dashboard/organizations/${organization.slug}`}
								className="hover:underline"
							>
								{organization.name}
							</Link>
						</TableCell>
						<TableCell>{organization.slug}</TableCell>
						<TableCell>
							{new Date(organization.createdAt).toLocaleDateString()}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
