"use client";

import { PanelLeftDashed } from "lucide-react";
import type React from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { cn } from "@/shared/utils/cn";

import type { SidebarState } from "../model/sidebar-state";
import { SidebarItem } from "./sidebar-item";

type SidebarControlOption = {
	label: string;
	value: SidebarState;
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
		// FIXME: When the hover disengages, it moves momentarily to the left.
		<div className={cn("transition-all duration-300", !isCollapsed && "mx-2")}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					{/* Wrap with <span> to ensure the menu opens on click */}
					<span>
						<SidebarItem
							icon={<PanelLeftDashed size={20} />}
							label="Sidebar settings"
							href="#"
							isCollapsed={isCollapsed}
						/>
					</span>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="w-56 ml-3">
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
								<span>{option.label}</span>
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
