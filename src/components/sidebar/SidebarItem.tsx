"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

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
		"flex items-center py-2 px-3 rounded-md text-sm font-medium",
		"transition-colors duration-200",
		isActive
			? "bg-secondary text-secondary-foreground"
			: "text-muted-foreground hover:text-foreground hover:bg-secondary/80",
	);

	// リンク内容
	const linkContent = (
		<>
			<span className="flex-shrink-0">{icon}</span>
			<span
				className={cn(
					"ml-3 whitespace-nowrap overflow-hidden transition-[width,opacity] duration-300",
					isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100",
				)}
			>
				{label}
			</span>
		</>
	);

	if (isCollapsed) {
		return (
			<TooltipProvider>
				<Tooltip delayDuration={0}>
					<TooltipTrigger asChild>
						<Link href={href} className={linkClass}>
							<span className="flex-shrink-0">{icon}</span>
						</Link>
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
			{linkContent}
		</Link>
	);
};
