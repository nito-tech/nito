"use client";

import { Check, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";

import { useOrganizationStore } from "@/entities/organization/model/organization-store";
import { useProjectStore } from "@/entities/project/model/project-store";
import type { Organization } from "@/shared/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSub,
} from "@/shared/ui/dropdown-menu";

// FIXME: Mock not working in Storybook.
import { useGetOrganizations } from "../../model/useOrganization";

export function OrganizationSelector() {
	const t = useTranslations();
	const { data: organizations } = useGetOrganizations();
	const { currentOrganization, setCurrentOrganization } =
		useOrganizationStore();
	const { setCurrentProject } = useProjectStore();

	const router = useRouter();
	function handleOrganizationClick(organization: Organization) {
		setCurrentOrganization(organization);
		setCurrentProject(null);
		router.push(`/dashboard/${organization.slug}`);
	}

	return (
		<DropdownMenuGroup className="w-64">
			{/* <DropdownMenuSub>
				<div className="p-2">
					<Input
						placeholder={t("Organization.findOrganization")}
						className="bg-transparent text-sm rounded-md block w-full pl-10 p-2.5"
					/>
				</div>
			</DropdownMenuSub>

			<DropdownMenuSeparator /> */}

			<DropdownMenuSub>
				<DropdownMenuLabel className="text-muted-foreground">
					Organizations
				</DropdownMenuLabel>
			</DropdownMenuSub>

			<DropdownMenuSub>
				{!organizations || organizations.length === 0 ? (
					<DropdownMenuItem className="text-muted-foreground">
						{t("Organization.noOrganizations")}
					</DropdownMenuItem>
				) : (
					organizations.map((organization) => (
						<DropdownMenuItem
							key={organization.id}
							className="px-2 py-1 focus:bg-transparent"
						>
							<Button
								variant="ghost"
								className="w-full px-2 py-5 justify-between"
								onClick={() => handleOrganizationClick(organization)}
							>
								<div className="flex items-center gap-2">
									<Avatar className="h-8 w-8">
										{/* FIXME: {organization.logo_url} */}
										<AvatarImage src="" alt={`${organization.name} logo`} />
										<AvatarFallback>
											{organization.name.substring(0, 2).toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<span className="text-foreground">{organization.name}</span>
								</div>
								<div>
									{currentOrganization?.id === organization.id && (
										<Check className="h-4 w-4" />
									)}
								</div>
							</Button>
						</DropdownMenuItem>
					))
				)}
			</DropdownMenuSub>

			<DropdownMenuItem className="focus:bg-transparent">
				<Button
					variant="outline"
					className="w-full bg-primary-foreground"
					onClick={() => {
						router.push("/dashboard/new-organization");
					}}
				>
					<Plus className="h-4 w-4" />
					<span>Create Organization</span>
				</Button>
			</DropdownMenuItem>
		</DropdownMenuGroup>
	);
}
