"use client";

import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

import { useOrganizationStore } from "@/entities/organization/model/organization-store";
import { useProjectStore } from "@/entities/project/model/project-store";
import { OrganizationSelector } from "@/features/organizations/ui/organization-selector/organization-selector";
import { ProjectSelector } from "@/features/project/ui/projector-selector/project-selector";
import type { Organization } from "@/shared/schema";
import { Button } from "@/shared/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Slash } from "@/shared/ui/slash";
import { cn } from "@/shared/utils/cn";

function HeaderDropdownMenu({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="focus:outline-none hover:cursor-pointer"
				>
					<span className="text-sm text-secondary-foreground mr-1">
						{label}
					</span>
					<ChevronsUpDown className="text-muted-foreground -mr-1" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">{children}</DropdownMenuContent>
		</DropdownMenu>
	);
}

function organizationTabs(organization: Organization) {
	return [
		{
			label: "Overview",
			href: `/dashboard/${organization.slug}`,
		},
		{
			label: "Settings",
			href: `/dashboard/${organization.slug}/settings`,
		},
	];
}

export default function Header() {
	const plan = "Free";
	const pathname = usePathname();
	const { currentOrganization } = useOrganizationStore();
	const { currentProject } = useProjectStore();

	return (
		<header className="border-b border-border bg-background sticky top-0 z-50">
			{/* First row: Logo and navigation */}
			<div className="h-14 flex items-center justify-between px-4">
				<div className="flex items-center space-x-4">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-emerald-500 rounded-md flex items-center justify-center flex-shrink-0 text-white">
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							<svg
								viewBox="0 0 24 24"
								width="20"
								height="20"
								stroke="currentColor"
								strokeWidth="2"
								fill="none"
							>
								<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
							</svg>
						</div>
						<span className="font-bold">Nito</span>
						<span className="text-xs px-2 py-0.5 bg-muted rounded text-muted-foreground">
							{plan}
						</span>
					</div>

					{currentOrganization && (
						<>
							<Slash />
							<HeaderDropdownMenu label={currentOrganization.name}>
								<OrganizationSelector />
							</HeaderDropdownMenu>
						</>
					)}

					{currentProject && (
						<>
							<Slash />
							<HeaderDropdownMenu label={currentProject.name}>
								<ProjectSelector />
							</HeaderDropdownMenu>
						</>
					)}
				</div>

				{/* Right section: Actions */}
				<div className="flex items-center space-x-2">
					<div className="w-8 h-8 rounded flex items-center justify-center bg-gradient-to-br from-emerald-400 to-blue-500 text-white font-medium">
						N
					</div>
				</div>
			</div>

			{/* Second row for Organization */}
			{currentOrganization && (
				<div className="h-12 px-4">
					<nav className="flex h-full gap-4">
						{organizationTabs(currentOrganization).map((tab) => (
							<Link
								key={tab.label}
								href={tab.href}
								className={cn(
									"flex items-center px-2 border-b-2 text-sm font-medium transition-colors hover:text-foreground",
									pathname === tab.href
										? "border-primary text-foreground"
										: "border-transparent text-muted-foreground hover:border-muted",
								)}
							>
								{tab.label}
							</Link>
						))}
					</nav>
				</div>
			)}
		</header>
	);
}
