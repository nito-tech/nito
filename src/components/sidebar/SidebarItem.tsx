"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

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

	return (
		<Link
			href={href}
			className={cn(
				"flex items-center py-2 px-3 rounded-md text-sm font-medium",
				"transition-colors duration-200",
				isActive
					? "bg-secondary text-secondary-foreground"
					: "text-muted-foreground hover:text-foreground hover:bg-secondary/80",
			)}
		>
			<span className="flex-shrink-0">{icon}</span>
			<span
				className={cn(
					"ml-3 whitespace-nowrap overflow-hidden transition-[width,opacity] duration-300",
					isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100",
				)}
			>
				{label}
			</span>
		</Link>
	);
};
