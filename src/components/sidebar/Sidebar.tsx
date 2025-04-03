"use client";

import {
	BarChart,
	Clock,
	Code,
	Command,
	Database,
	FileBox,
	FileText,
	Home,
	Layers,
	Lightbulb,
	Lock,
	Settings,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

import { useLocalStorage } from "@/shared/lib/useLocalStorage";
import { Separator } from "@/shared/ui/separator";
import { cn } from "@/shared/utils/cn";

import { SidebarControl } from "./SidebarControl";
import { SidebarItem } from "./SidebarItem";
import SidebarUserProfile from "./SidebarUserProfile";

export type SidebarState = "expanded" | "collapsed" | "hover";

type NavItem = {
	icon: React.ReactNode;
	label: string;
	href: string;
};

const mainNavItems: NavItem[] = [
	{ icon: <Home size={20} />, label: "Project overview", href: "/dashboard" },
	{ icon: <FileText size={20} />, label: "Table Editor", href: "/tables" },
	{ icon: <Code size={20} />, label: "SQL Editor", href: "/sql" },
];

const resourceNavItems: NavItem[] = [
	{ icon: <Database size={20} />, label: "Database", href: "/database" },
	{ icon: <Lock size={20} />, label: "Authentication", href: "/auth" },
	{ icon: <FileBox size={20} />, label: "Storage", href: "/storage" },
	{ icon: <Code size={20} />, label: "Edge Functions", href: "/functions" },
	{ icon: <Clock size={20} />, label: "Realtime", href: "/realtime" },
];

const utilityNavItems: NavItem[] = [
	{ icon: <Lightbulb size={20} />, label: "Advisors", href: "/advisors" },
	{ icon: <BarChart size={20} />, label: "Reports", href: "/reports" },
	{ icon: <FileText size={20} />, label: "Logs", href: "/logs" },
	{ icon: <FileText size={20} />, label: "API Docs", href: "/api-docs" },
	{ icon: <Layers size={20} />, label: "Integrations", href: "/integrations" },
];

const footerNavItems: NavItem[] = [
	{
		icon: <Settings size={20} />,
		label: "Project Settings",
		href: "/settings",
	},
	{ icon: <Command size={20} />, label: "Command Menu", href: "/command" },
];

export const Sidebar = () => {
	const [sidebarState, setSidebarState] = useLocalStorage<SidebarState>(
		"sidebar-state",
		"expanded",
	);
	const [isHovered, setIsHovered] = useState(false);

	const isCollapsed =
		sidebarState === "collapsed" || (sidebarState === "hover" && !isHovered);

	return (
		<div
			className="relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<nav
				aria-label="Sidebar Navigation"
				className={cn(
					"bg-card text-card-foreground h-full border-r border-border flex flex-col",
					"transition-[width] duration-300 pt-2 pb-4",
					isCollapsed ? "w-16" : "w-56",
				)}
			>
				<div className="flex-1 overflow-y-auto">
					{/* Navigation Items */}
					<div className="flex flex-col gap-0.5 px-2">
						{/* Main Navigation */}
						{mainNavItems.map((item) => (
							<SidebarItem
								key={item.href}
								icon={item.icon}
								label={item.label}
								href={item.href}
								isCollapsed={isCollapsed}
							/>
						))}

						<div className="px-1">
							<Separator className="border-border my-2" />
						</div>

						{/* Resource Navigation */}
						{resourceNavItems.map((item) => (
							<SidebarItem
								key={item.href}
								icon={item.icon}
								label={item.label}
								href={item.href}
								isCollapsed={isCollapsed}
							/>
						))}

						<div className="px-1">
							<Separator className="border-border my-2" />
						</div>

						{/* Utility Navigation */}
						{utilityNavItems.map((item) => (
							<SidebarItem
								key={item.href}
								icon={item.icon}
								label={item.label}
								href={item.href}
								isCollapsed={isCollapsed}
							/>
						))}
					</div>
				</div>

				<div className="mt-auto border-t border-border">
					{/* Footer Navigation Items */}
					<nav className="flex flex-col gap-0.5 px-2 py-2">
						{footerNavItems.map((item) => (
							<SidebarItem
								key={item.href}
								icon={item.icon}
								label={item.label}
								href={item.href}
								isCollapsed={isCollapsed}
							/>
						))}
					</nav>

					<SidebarUserProfile isCollapsed={isCollapsed} />

					<SidebarControl
						sidebarState={sidebarState}
						isCollapsed={isCollapsed}
						onChange={setSidebarState}
					/>
				</div>
			</nav>
		</div>
	);
};

export default Sidebar;
