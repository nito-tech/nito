"use client";

import { PanelLeftDashed } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import type { SidebarState } from "./types";

type SidebarControlOption = {
	label: string;
	value: SidebarState;
};

const sidebarOptions: SidebarControlOption[] = [
	{ label: "Expanded", value: "expanded" },
	{ label: "Collapsed", value: "collapsed" },
	{ label: "Expand on hover", value: "hover" },
];

const customRadioStyles = {
	width: "8px",
	height: "8px",
	minWidth: "8px",
	minHeight: "8px",
	aspectRatio: "1 / 1",
};

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
	const [open, setOpen] = useState(false);

	const handleValueChange = (value: string) => {
		onChange(value as SidebarState);
		setOpen(false);
	};

	return (
		<div
			className={cn(
				"transition-all duration-300",
				isCollapsed ? "mx-auto w-12" : "mx-4",
			)}
		>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="ghost"
						aria-label="Sidebar settings"
						className={cn(
							"w-full flex items-center py-2 px-3 rounded-md text-sm font-medium",
							"transition-colors duration-200",
							"text-muted-foreground hover:text-foreground hover:bg-secondary/80",
							isCollapsed ? "justify-center" : "justify-start",
						)}
					>
						<span className="flex-shrink-0">
							<PanelLeftDashed size={isCollapsed ? 20 : 20} />
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
				</PopoverTrigger>
				<PopoverContent className="w-56 p-3" side="top">
					<div className="space-y-3">
						<h4 className="font-medium text-sm text-secondary-foreground">
							Sidebar Control
						</h4>
						<RadioGroup
							value={sidebarState}
							onValueChange={handleValueChange}
							className="space-y-1"
						>
							{sidebarOptions.map((option) => (
								<Label
									key={option.value}
									htmlFor={`sidebar-${option.value}`}
									className="flex items-center hover:bg-secondary/80 hover:text-foreground rounded-md px-2 py-1.5 cursor-pointer w-full"
								>
									<RadioGroupItem
										value={option.value}
										id={`sidebar-${option.value}`}
										style={customRadioStyles}
										className={cn(
											"border-0", // Remove border
											"data-[state=checked]:border-0", // No border when checked
											"data-[state=checked]:bg-primary", // Background color when checked
											"focus-visible:ring-0", // Remove focus ring
											"focus-visible:ring-offset-0", // Remove ring offset
										)}
									/>
									<div className="flex items-center ml-2 text-sm font-normal">
										<span>{option.label}</span>
									</div>
								</Label>
							))}
						</RadioGroup>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};
