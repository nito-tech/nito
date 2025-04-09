"use client";

import { ChevronsUpDown, Plus } from "lucide-react";
import React from "react";

import { OrganizationSelector } from "@/features/organizations/ui/organization-selector/organization-selector";
import { Button } from "@/shared/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";
import { Slash } from "@/shared/ui/slash";

function ProjectSelector() {
	return (
		<div className="w-64">
			<div className="p-3 border-b border-border">
				<Input
					placeholder="Find Project..."
					className="bg-transparent text-sm rounded-md block w-full pl-10 p-2.5"
				/>
			</div>

			<div className="p-3 border-b border-border">
				<div className="text-sm text-muted-foreground mb-3">Favorites</div>
				<div className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary cursor-pointer">
					<div className="w-6 h-6 flex items-center justify-center text-muted-foreground">
						▲
					</div>
					<span className="text-foreground">nito</span>
				</div>
			</div>

			<div className="p-3">
				<div className="text-sm text-muted-foreground mb-3">Projects</div>
				<div className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary cursor-pointer">
					<div className="w-6 h-6 flex items-center justify-center text-muted-foreground">
						▲
					</div>
					<span className="text-foreground">nito</span>
				</div>
				<Button
					variant="outline"
					className="w-full mt-3 bg-primary-foreground flex items-center justify-center gap-2 p-2 text-sm rounded-md border border-border"
				>
					<Plus className="h-4 w-4" />
					<span>Create Project</span>
				</Button>
			</div>
		</div>
	);
}

export default function Header() {
	const plan = "Free";

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

				<div className="flex items-center border rounded-lg">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="focus:outline-none hover:cursor-pointer"
							>
								<span className="text-sm text-secondary-foreground mr-1">
									nito
								</span>
								<ChevronsUpDown className="text-muted-foreground -mr-1" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" className="p-0">
							<div className="flex">
								<OrganizationSelector />
								<ProjectSelector />
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<Slash />

				<div className="flex items-center border border-muted rounded-lg">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="focus:outline-none hover:cursor-pointer"
							>
								<span className="text-sm text-secondary-foreground mr-1">
									My Project
								</span>
								<ChevronsUpDown className="text-muted-foreground -mr-1" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="start"
							className="w-auto p-0 bg-primary-foreground border border-muted rounded-md shadow-lg"
							sideOffset={10}
						>
							<div className="flex">
								<OrganizationSelector />
								<ProjectSelector />
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
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
