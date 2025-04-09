"use client";

import { ChevronsUpDown } from "lucide-react";
import type React from "react";

import { useOrganizationStore } from "@/entities/organization/model/organization-store";
import { OrganizationSelector } from "@/features/organizations/ui/organization-selector/organization-selector";
import { ProjectSelector } from "@/features/project/ui/projector-selector/project-selector";
import { Button } from "@/shared/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Slash } from "@/shared/ui/slash";

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
			<DropdownMenuContent align="start" className="">
				<div className="flex">{children}</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default function Header() {
	const plan = "Free";

	const { currentOrganization } = useOrganizationStore();

	return (
		<header className="h-14 border-b border-border flex items-center justify-between px-4 bg-background sticky top-0 z-50">
			{/* Left section: Logo and navigation */}
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

				<Slash />

				<HeaderDropdownMenu label={currentOrganization?.name ?? "-"}>
					<OrganizationSelector />
				</HeaderDropdownMenu>

				<Slash />

				<HeaderDropdownMenu label="My Project">
					<ProjectSelector />
				</HeaderDropdownMenu>
			</div>

			{/* Right section: Actions */}
			<div className="flex items-center space-x-2">
				<div className="w-8 h-8 rounded flex items-center justify-center bg-gradient-to-br from-emerald-400 to-blue-500 text-white font-medium">
					N
				</div>
			</div>
		</header>
	);
}
