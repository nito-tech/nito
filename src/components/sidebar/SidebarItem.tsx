"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarItemProps = {
	icon: React.ReactNode;
	label: string;
	href: string;
	isCollapsed: boolean;
};

export const SidebarItem = ({
	icon,
	label,
	href,
	isCollapsed,
}: SidebarItemProps) => {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link
			href={href}
			className={cn(
				"flex items-center py-2 px-3 rounded-md text-sm font-medium",
				"transition-colors duration-200",
				isActive
					? "bg-gray-800 text-white"
					: "text-gray-400 hover:text-white hover:bg-gray-800",
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
