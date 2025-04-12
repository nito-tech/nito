"use client";

import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import type React from "react";

import { useOrganizationStore } from "@/entities/organization/model/organization-store";
import { useProjectStore } from "@/entities/project/model/project-store";
import { OrganizationSelector } from "@/features/organizations/ui/organization-selector/organization-selector";
import { ProjectSelector } from "@/features/project/ui/projector-selector/project-selector";
import type { Organization, Project } from "@/shared/schema";
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
	onClick,
	children,
}: {
	label: string;
	onClick: () => void;
	children: React.ReactNode;
}) {
	return (
		<div className="flex items-center border border-border rounded-lg">
			<Button
				variant="ghost"
				className="focus:outline-none hover:cursor-pointer rounded-r-none border-r border-border"
				onClick={onClick}
			>
				<span className="text-sm text-secondary-foreground mr-1">{label}</span>
			</Button>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="focus:outline-none hover:cursor-pointer rounded-l-none w-7"
					>
						<ChevronsUpDown className="text-muted-foreground" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>{children}</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

type SubHeaderTab = {
	label: string;
	href: string;
};

function organizationTabs(organization: Organization): SubHeaderTab[] {
	return [
		{
			label: "Overview",
			href: `/dashboard/${organization.slug}`,
		},
		{
			label: "Members",
			href: `/dashboard/${organization.slug}/members`,
		},
		{
			label: "Settings",
			href: `/dashboard/${organization.slug}/settings`,
		},
	];
}

function projectTabs(
	project: Project,
	organization: Organization,
): SubHeaderTab[] {
	return [
		{
			label: "Overview",
			href: `/dashboard/${organization.slug}/projects/${project.name}`,
		},
		{
			label: "Settings",
			href: `/dashboard/${organization.slug}/projects/${project.name}/settings`,
		},
	];
}

export default function Header() {
	const plan = "Free";
	const pathname = usePathname();
	const router = useRouter();
	const { currentOrganization, setCurrentOrganization } =
		useOrganizationStore();
	const { currentProject, setCurrentProject } = useProjectStore();

	const subHeaderTabs = useMemo(() => {
		// TODO: Check pathname

		if (currentProject && currentOrganization) {
			return projectTabs(currentProject, currentOrganization);
		}

		if (currentOrganization) {
			return organizationTabs(currentOrganization);
		}

		return [];
	}, [currentOrganization, currentProject]);

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
							<HeaderDropdownMenu
								label={currentOrganization.name}
								onClick={() => {
									setCurrentProject(null);
									router.push(`/dashboard/${currentOrganization.slug}`);
								}}
							>
								<OrganizationSelector />
							</HeaderDropdownMenu>
						</>
					)}

					{currentOrganization && currentProject && (
						<>
							<Slash />
							<HeaderDropdownMenu
								label={currentProject.name}
								onClick={() => {
									router.push(
										`/dashboard/${currentOrganization.slug}/projects/${currentProject.name}`,
									);
								}}
							>
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

			{subHeaderTabs.length > 0 && (
				<div className="h-12 px-4">
					<nav className="flex h-full gap-4">
						{subHeaderTabs.map((tab) => (
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
