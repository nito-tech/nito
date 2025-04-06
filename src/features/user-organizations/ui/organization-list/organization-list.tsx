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

import { useUserOrganizations } from "../../model/useUserOrganizations";

type OrganizationListProps = {
	userId: string;
};

/**
 * Component that displays a list of organizations
 * @param userId The ID of the user whose organizations to display
 */
export function OrganizationList({ userId }: OrganizationListProps) {
	const t = useTranslations();
	const {
		data: organizations,
		isLoading,
		error,
	} = useUserOrganizations(userId);

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
				{organizations.map((org) => (
					<TableRow key={org.id}>
						<TableCell>
							<Link
								href={`/dashboard/organizations/${org.slug}`}
								className="hover:underline"
							>
								{org.name}
							</Link>
						</TableCell>
						<TableCell>{org.slug}</TableCell>
						<TableCell>
							{new Date(org.created_at).toLocaleDateString()}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
