"use client";

import { useTranslations } from "next-intl";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Skeleton } from "@/shared/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/ui/table";

import { useProfile } from "@/shared/contexts/ProfileContext";
import type { Organization } from "@/shared/schema";
import { useGetOrganizationMembers } from "../../model/useOrganization";

interface Props {
	organization: Organization;
}

/**
 * Component that displays a list of organization members
 */
export function MemberList({ organization }: Props) {
	const t = useTranslations();
	const { profile } = useProfile();
	const {
		data: members,
		isLoading,
		error,
	} = useGetOrganizationMembers({
		organizationId: organization.id,
	});

	if (error) {
		return (
			<div className="text-destructive">
				{t("Organization.error.failedToLoadMembers")}
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

	if (!members?.length) {
		return (
			<div className="text-muted-foreground">{t("Organization.noMembers")}</div>
		);
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>{t("Organization.member.avatar")}</TableHead>
					<TableHead>{t("Organization.member.userId")}</TableHead>
					<TableHead>{t("Organization.member.role")}</TableHead>
					<TableHead>{t("Organization.member.joinedAt")}</TableHead>
					<TableHead>{t("Organization.member.lastActiveAt")}</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{members.map((member) => (
					<TableRow key={member.id}>
						<TableCell>
							<Avatar className="h-8 w-8">
								<AvatarImage
									src={
										member.user_id === profile?.id
											? profile?.avatar_url || undefined
											: undefined
									}
									alt={member.user_id}
								/>
								<AvatarFallback>
									{member.user_id.substring(0, 2).toUpperCase()}
								</AvatarFallback>
							</Avatar>
						</TableCell>
						<TableCell>{member.user_id}</TableCell>
						<TableCell>
							<Badge variant="outline">{member.role}</Badge>
						</TableCell>
						<TableCell>
							{new Date(member.joined_at).toLocaleDateString()}
						</TableCell>
						<TableCell>
							{new Date(member.last_active_at).toLocaleDateString()}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
