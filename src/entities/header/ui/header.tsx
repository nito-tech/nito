"use client";

import {
	Check,
	ChevronsUpDown,
	ExternalLink,
	MoveVertical,
	Plus,
	Search,
} from "lucide-react";
import React, { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";

function SelectorToggleButton() {
	const [isHovered, setIsHovered] = useState(false);

	return (
		//  bg-blue-300
		<div className="flex justify-center items-center">
			<Button
				//  bg-red-300
				className="flex items-center rounded-md cursor-pointer px-1"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{/* ホバー時に表示されるボタン */}
				{/*  bg-red-200 */}
				<div className="w-6 h-6 rounded-md flex items-center justify-center transition-colors duration-150">
					<MoveVertical className="w-4 h-4 text-gray-600 transition-opacity duration-150" />
				</div>
			</Button>
		</div>
	);
}

function OrganizationSelector() {
	return (
		<div className="w-64 border-r border-border">
			<div className="p-3 border-b border-border">
				<Input
					placeholder="Find Organization..."
					className="bg-transparent text-sm rounded-md block w-full pl-10 p-2.5"
				/>
			</div>

			<div className="p-3">
				<div className="text-sm text-muted-foreground mb-3">Organizations</div>
				<div className="space-y-2">
					<div className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary cursor-pointer">
						<Avatar className="h-8 w-8">
							<AvatarImage src={undefined} alt={""} />
							<AvatarFallback>
								{"nito".substring(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<span className="text-foreground">saneatsu</span>
					</div>
					<div className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary cursor-pointer">
						<Avatar className="h-8 w-8">
							<AvatarImage src={undefined} alt={""} />
							<AvatarFallback>
								{"ALIA".substring(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<span className="text-foreground">ALIA</span>
					</div>
				</div>
				<Button
					variant="outline"
					className="w-full mt-3 bg-primary-foreground flex items-center justify-center gap-2 p-2 text-sm rounded-md border border-border"
				>
					<Plus className="h-4 w-4" />
					<span>Create Team</span>
				</Button>
			</div>
		</div>
	);
}

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

function Slash() {
	return (
		<div className="flex items-center justify-center">
			<div className="absolute w-5 h-0.5 bg-border transform -rotate-[65deg]" />
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

				<div className="flex items-center border border-muted rounded-lg">
					{/* <Button
						type="button"
						variant="ghost"
						className="rounded-r-none hover:cursor-pointer"
					>
						<span className="text-sm text-secondary-foreground">nito</span>
					</Button> */}

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

				<Slash />
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
