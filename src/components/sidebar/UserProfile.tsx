"use client";

import {
	Beaker,
	Command,
	Laptop,
	LogOut,
	Moon,
	Settings,
	Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

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
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// next-themes only works on the client side,
	// so only use theme information after mounting
	useEffect(() => {
		setMounted(true);
	}, []);

	// Get current theme value safely
	const currentTheme = mounted ? (theme as Theme) : "system";

	return (
		<div className="px-3 py-3 border-t border-border">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						type="button"
						className={cn(
							"w-full flex items-center gap-3 p-2 rounded-md transition-colors duration-200",
							"hover:bg-secondary",
							isCollapsed ? "justify-center" : "justify-start",
						)}
					>
						<Avatar className="h-8 w-8 flex-shrink-0">
							<AvatarImage src={avatarUrl} alt={username} />
							<AvatarFallback className="bg-muted text-muted-foreground">
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
								<p className="text-sm font-medium text-foreground">
									{username}
								</p>
								<p className="text-xs text-muted-foreground truncate">
									{email}
								</p>
							</div>
						)}
					</button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuLabel className="flex flex-col space-y-1">
						<span>{username}</span>
						<span className="text-xs font-normal text-muted-foreground">
							{email}
						</span>
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
						value={currentTheme}
						onValueChange={(value) => setTheme(value as Theme)}
					>
						<DropdownMenuRadioItem value="light" className="cursor-pointer">
							<Sun className="mr-2 h-4 w-4" />
							<span>Light</span>
						</DropdownMenuRadioItem>

						<DropdownMenuRadioItem value="dark" className="cursor-pointer">
							<Moon className="mr-2 h-4 w-4" />
							<span>Dark</span>
						</DropdownMenuRadioItem>

						<DropdownMenuRadioItem value="system" className="cursor-pointer">
							<Laptop className="mr-2 h-4 w-4" />
							<span>System</span>
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>

					<DropdownMenuSeparator />

					<DropdownMenuItem className="cursor-pointer">
						<LogOut className="mr-2 h-4 w-4" />
						<span>Log out</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserProfile;
