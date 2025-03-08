"use client";

import React, { useState } from "react";

import {
	Beaker,
	Command,
	LogOut,
	Moon,
	Settings,
	Sun,
	SunMoon,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Theme = "dark" | "light" | "system";

interface UserProfileProps {
	username: string;
	email: string;
	avatarUrl?: string;
	isCollapsed: boolean;
}

export const UserProfile = ({
	username,
	email,
	avatarUrl,
	isCollapsed,
}: UserProfileProps) => {
	const [theme, setTheme] = useState<Theme>("system");

	return (
		<div className="px-3 py-3 border-t border-gray-800">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						type="button"
						className={cn(
							"w-full flex items-center gap-3 p-2 rounded-md hover:bg-gray-800 transition-colors duration-200",
							isCollapsed ? "justify-center" : "justify-start",
						)}
					>
						<Avatar className="h-8 w-8 flex-shrink-0">
							<AvatarImage src={avatarUrl} alt={username} />
							<AvatarFallback className="bg-gray-700 text-gray-200">
								{username.substring(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>

						{!isCollapsed && (
							<div
								className={cn(
									"text-left overflow-hidden whitespace-nowrap transition-[width,opacity] duration-300",
									isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100",
								)}
							>
								<p className="text-sm font-medium text-gray-200">{username}</p>
								<p className="text-xs text-gray-400 truncate">{email}</p>
							</div>
						)}
					</button>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					align="end"
					className="w-56 bg-gray-900 border border-gray-800 text-gray-200"
				>
					<DropdownMenuLabel className="flex flex-col space-y-1">
						<span>{username}</span>
						<span className="text-xs font-normal text-gray-400">{email}</span>
					</DropdownMenuLabel>

					<DropdownMenuSeparator />

					<DropdownMenuItem className="cursor-pointer">
						<Settings className="mr-2 h-4 w-4" />
						<span>Account preferences</span>
					</DropdownMenuItem>

					<DropdownMenuItem className="cursor-pointer">
						<Beaker className="mr-2 h-4 w-4" />
						<span>Feature previews</span>
					</DropdownMenuItem>

					<DropdownMenuItem className="cursor-pointer">
						<Command className="mr-2 h-4 w-4" />
						<span>Command menu</span>
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					<DropdownMenuLabel>Theme</DropdownMenuLabel>

					<DropdownMenuRadioGroup
						value={theme}
						onValueChange={(value) => setTheme(value as Theme)}
					>
						<DropdownMenuRadioItem value="dark" className="cursor-pointer">
							<Moon className="mr-2 h-4 w-4" />
							<span>Dark</span>
						</DropdownMenuRadioItem>

						<DropdownMenuRadioItem value="light" className="cursor-pointer">
							<Sun className="mr-2 h-4 w-4" />
							<span>Light</span>
						</DropdownMenuRadioItem>

						<DropdownMenuRadioItem value="system" className="cursor-pointer">
							<SunMoon className="mr-2 h-4 w-4" />
							<span>System</span>
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>

					<DropdownMenuSeparator />

					<DropdownMenuItem className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-950">
						<LogOut className="mr-2 h-4 w-4" />
						<span>Log out</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserProfile;
