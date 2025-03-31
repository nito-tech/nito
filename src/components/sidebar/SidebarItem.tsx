"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils/cn";

type Props = {
	icon: React.ReactNode;
	label: string;
	href: string;
	isCollapsed: boolean;
};

export const SidebarItem = ({ icon, label, href, isCollapsed }: Props) => {
	const pathname = usePathname();
	const isActive = pathname === href;

	const linkClass = cn(
		"flex text-sm font-medium rounded",
		"transition-colors duration-200",
		isActive
			? "bg-secondary text-secondary-foreground"
			: "text-muted-foreground hover:text-foreground hover:bg-secondary/80",
	);

	if (isCollapsed) {
		return (
			<TooltipProvider>
				<Tooltip delayDuration={0}>
					<TooltipTrigger asChild>
						{/* FIXME: When the hover comes off, the icon comes to the center for a moment */}
						<div className="flex justify-center rounded">
							<Link href={href} className={linkClass}>
								<Button variant="ghost" size="icon" className="rounded">
									{icon}
								</Button>
							</Link>
						</div>
					</TooltipTrigger>
					<TooltipContent side="right" sideOffset={10}>
						{label}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	}

	return (
		<Link href={href} className={linkClass}>
			<Button
				variant="ghost"
				aria-label={label}
				className="w-full justify-start"
			>
				<span className="flex-shrink-0">{icon}</span>
				<span
					className={cn(
						"ml-2 whitespace-nowrap overflow-hidden transition-[width,opacity] duration-300",
						isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100",
					)}
				>
					{label}
				</span>
			</Button>
		</Link>
	);
};
