"use client";

import { PanelLeftDashed } from "lucide-react";
import type React from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import type { SidebarState } from "./types";

type SidebarControlOption = {
	label: string;
	value: SidebarState;
	icon?: React.ReactNode;
};

const sidebarOptions: SidebarControlOption[] = [
	{ label: "Expanded", value: "expanded" },
	{ label: "Collapsed", value: "collapsed" },
	{ label: "Expand on hover", value: "hover" },
];

type Props = {
	sidebarState: SidebarState;
	isCollapsed: boolean;
	onChange: (state: SidebarState) => void;
};

export const SidebarControl = ({
	sidebarState,
	isCollapsed,
	onChange,
}: Props) => {
	return (
		<div
			className={cn(
				"transition-all duration-300",
				isCollapsed ? "mx-auto w-12" : "mx-4",
			)}
		>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						aria-label="Sidebar settings"
						className={cn(
							"w-full flex items-center py-2 px-3 rounded-md text-sm font-medium",
							"transition-colors duration-200",
							"text-muted-foreground hover:text-foreground hover:bg-secondary/80",
							"focus:outline-none focus-visible:ring-0",
							isCollapsed ? "justify-center" : "justify-start",
						)}
					>
						<span className="flex-shrink-0">
							<PanelLeftDashed size={20} />
						</span>
						{!isCollapsed && (
							<span
								className={cn(
									"ml-3 whitespace-nowrap overflow-hidden transition-[width,opacity] duration-300",
									isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100",
								)}
							>
								Sidebar Settings
							</span>
						)}
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuLabel>Sidebar Control</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup
						value={sidebarState}
						onValueChange={(value) => onChange(value as SidebarState)}
					>
						{sidebarOptions.map((option) => (
							<DropdownMenuRadioItem
								key={option.value}
								value={option.value}
								className="cursor-pointer"
							>
								{option.icon && option.icon}
								<span className={option.icon ? "ml-2" : ""}>
									{option.label}
								</span>
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
