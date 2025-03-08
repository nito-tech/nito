"use client";

import { Beaker, Command, LogOut, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type React from "react";

import { themeOptions } from "@/components/theme/ThemeToggleButton";
import type { Theme } from "@/components/theme/ThemeToggleButton";
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
import { logOut } from "@/features/auth/logout/actions";
import { cn } from "@/lib/utils";

interface Props {
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
}: Props) => {
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
							"w-full flex items-center gap-3 p-2 rounded-md transition-colors duration-200 cursor-pointer",
							"focus:outline-none focus-visible:ring-0",
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
						{themeOptions.map((option) => (
							<DropdownMenuRadioItem
								key={option.value}
								value={option.value}
								className="cursor-pointer"
							>
								{option.icon}
								<span className="ml-2">{option.label}</span>
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>

					<DropdownMenuSeparator />

					<DropdownMenuItem className="cursor-pointer">
						<form action={logOut}>
							<button
								type="submit"
								className="w-full flex items-center text-sm cursor-pointer"
							>
								<LogOut className="mr-4 h-4 w-4" />
								<span>Log out</span>
							</button>
						</form>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserProfile;
