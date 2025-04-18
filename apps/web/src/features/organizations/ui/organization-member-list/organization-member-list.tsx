"use client";

import type { SelectOrganization } from "@nito/db";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

import { useProfile } from "@/shared/contexts/ProfileContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Skeleton } from "@/shared/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/ui/table";

import { useGetOrganizationMembers } from "../../model/useOrganization";

interface Props {
	organization: SelectOrganization;
}

/**
 * Component that displays a list of organization members
 */
export function OrganizationMemberList({ organization }: Props) {
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
					<TableHead>{t("Member.username")}</TableHead>
					<TableHead>{t("Member.role")}</TableHead>
					<TableHead>{t("Member.joinedAt")}</TableHead>
					<TableHead>{t("Member.lastActiveAt")}</TableHead>
					<TableHead className="w-[50px]" />
				</TableRow>
			</TableHeader>
			<TableBody>
				{members.map((member) => (
					<TableRow key={member.id}>
						<TableCell>
							<div className="flex items-center gap-3">
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
										{member.profile.display_name?.substring(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>

								<div className="flex flex-col">
									<span className="font-medium">
										{member.profile.display_name}
									</span>
									<span className="text-sm text-muted-foreground">
										{member.profile.email || "No email"}
									</span>
								</div>
							</div>
						</TableCell>
						<TableCell>
							<Badge variant="outline">{member.role}</Badge>
						</TableCell>
						<TableCell>{format(member.joined_at, "yyyy-MM-dd")}</TableCell>
						<TableCell>{format(member.last_active_at, "yyyy-MM-dd")}</TableCell>
						<TableCell>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="h-8 w-8 p-0"
										aria-label={t("Organization.member.actions")}
									>
										<MoreHorizontal className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem>
										{t("Organization.member.manageAccess")}
									</DropdownMenuItem>
									<DropdownMenuItem className="text-destructive focus:text-destructive">
										{t("Organization.member.removeFromOrganization")}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
