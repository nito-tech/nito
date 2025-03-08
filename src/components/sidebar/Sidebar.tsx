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
import React, { useState } from "react";

import { Divider } from "@/components/Divider";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";

import { SidebarControl } from "./SidebarControl";
import { SidebarItem } from "./SidebarItem";
import UserProfile from "./UserProfile";
import type { NavItem, SidebarState } from "./types";

const mainNavItems: NavItem[] = [
	{ icon: <Home size={20} />, label: "Project overview", href: "/" },
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

	// Sample User Info
	const userInfo = {
		username: "saneatsu",
		email: "w.saneatsu@gmail.com",
		avatarUrl: "https://github.com/shadcn.png",
	};

	return (
		<div
			className="relative h-screen"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div
				className={cn(
					"bg-gray-900 text-white h-full border-r border-gray-800 flex flex-col",
					"transition-[width] duration-300 pt-2 pb-4",
					isCollapsed ? "w-16" : "w-64",
				)}
			>
				{/* Logo and Header */}
				<div className="p-4 border-b border-gray-800 flex items-center">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-emerald-500 rounded-md flex items-center justify-center flex-shrink-0">
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
						<div
							className={cn(
								"flex items-center gap-2 whitespace-nowrap overflow-hidden transition-[width,opacity] duration-300",
								isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100",
							)}
						>
							<span className="font-bold">Nito</span>
							<span className="text-xs px-2 py-0.5 bg-gray-800 rounded">
								Free
							</span>
						</div>
					</div>
				</div>

				{/* Scrollable Navigation area */}
				<div className="flex-1 overflow-y-auto">
					{/* Navigation Items */}
					<nav className="flex flex-col gap-0.5 px-2 py-2">
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

						<Divider className="border-border" />

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

						<Divider className="border-border" />

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
					</nav>
				</div>

				<div className="mt-auto border-t border-gray-800">
					<nav className="flex flex-col gap-0.5 px-2 py-2">
						{/* Footer Navigation Items */}
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

					<UserProfile
						username={userInfo.username}
						email={userInfo.email}
						avatarUrl={userInfo.avatarUrl}
						isCollapsed={isCollapsed}
					/>

					<SidebarControl
						sidebarState={sidebarState}
						isCollapsed={isCollapsed}
						onChange={setSidebarState}
					/>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
