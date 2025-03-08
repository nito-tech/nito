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
				"absolute bottom-4 left-0 right-0 transition-all duration-300",
				isCollapsed ? "mx-auto w-12" : "mx-4",
			)}
		>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="ghost"
						aria-label="Sidebar settings"
						className="w-full justify-start items-center py-5"
					>
						<PanelLeftDashed size={isCollapsed ? 20 : 18} />
						{!isCollapsed && (
							<span className="ml-2 text-sm">Sidebar Settings</span>
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
							className="space-y-2"
						>
							<div className="flex items-center space-x-2 hover:cursor-pointer">
								<RadioGroupItem value="expanded" id="expanded" />
								<Label htmlFor="expanded" className="text-secondary-foreground">
									Expanded
								</Label>
							</div>
							<div className="flex items-center space-x-2 hover:cursor-pointer">
								<RadioGroupItem value="collapsed" id="collapsed" />
								<Label
									htmlFor="collapsed"
									className="text-secondary-foreground"
								>
									Collapsed
								</Label>
							</div>
							<div className="flex items-center space-x-2 hover:cursor-pointer">
								<RadioGroupItem value="hover" id="hover" />
								<Label htmlFor="hover" className="text-secondary-foreground">
									Expand on hover
								</Label>
							</div>
						</RadioGroup>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};
