"use client";

import type { SelectOrganization, SelectProject } from "@nito/db";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

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

import { useGetProjectMembersWithProfiles } from "../../model/useProject";

interface Props {
	id: SelectProject["id"];
	organizationId: SelectOrganization["id"];
}

/**
 * Component that displays a list of project members
 */
export function ProjectMemberTable({ id, organizationId }: Props) {
	const t = useTranslations();
	const {
		data: projectMembers,
		isLoading,
		error,
	} = useGetProjectMembersWithProfiles({
		id,
		organizationId,
	});

	if (error) {
		return (
			<div className="text-destructive">
				{t("Project.error.failedToLoadMembers")}
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

	if (!projectMembers?.length) {
		return (
			<div className="text-muted-foreground">{t("Project.noMembers")}</div>
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
				{projectMembers.map((projectMember) => (
					<TableRow key={projectMember.id}>
						<TableCell>
							<div className="flex items-center gap-3">
								<Avatar className="h-8 w-8">
									<AvatarImage
										src={projectMember.profile.avatarUrl ?? undefined}
										alt={projectMember.profile.username ?? ""}
									/>
									<AvatarFallback>
										{projectMember.profile.displayName
											?.substring(0, 2)
											.toUpperCase() ?? ""}
									</AvatarFallback>
								</Avatar>

								<div className="flex flex-col">
									<span className="font-medium">
										{projectMember.profile.displayName ?? ""}
									</span>
									<span className="text-sm text-muted-foreground">
										{projectMember.profile.email ?? "No email"}
									</span>
								</div>
							</div>
						</TableCell>
						<TableCell>
							<Badge variant="outline">{projectMember.role}</Badge>
						</TableCell>
						<TableCell>
							{format(new Date(projectMember.createdAt), "yyyy-MM-dd")}
						</TableCell>
						<TableCell>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="h-8 w-8 p-0"
										aria-label={t("Project.member.actions")}
									>
										<MoreHorizontal className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem>
										{t("Project.member.manageAccess")}
									</DropdownMenuItem>
									<DropdownMenuItem className="text-destructive focus:text-destructive">
										{t("Project.member.removeFromProject")}
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
