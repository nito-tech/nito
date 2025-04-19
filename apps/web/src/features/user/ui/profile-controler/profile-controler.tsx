"use client";

import { Beaker, Command, LogOut, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type React from "react";

import { useAuth } from "@/shared/contexts/AuthContext";
import { useProfile } from "@/shared/contexts/ProfileContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
	isTheme,
	themeOptions,
} from "@/shared/ui/theme-selector/theme-selector";
import { cn } from "@/shared/utils/cn";

export default function ProfileControler() {
	const t = useTranslations("UserInfo");

	// ----------------------------------------------
	// User Data
	// ----------------------------------------------
	const { user, logOut } = useAuth();
	const { profile } = useProfile();

	const userData = useMemo(
		() => ({
			username: profile?.username ?? "-",
			email: user?.email ?? "-",
			avatarUrl: profile?.avatarUrl ?? "",
		}),
		[profile?.username, user?.email, profile?.avatarUrl],
	);

	// ----------------------------------------------
	// Theme
	// ----------------------------------------------
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// next-themes only works on the client side,
	// so only use theme information after mounting
	useEffect(() => setMounted(true), []);

	// Get current theme value safely
	const currentTheme = mounted ? theme : "system";

	// ----------------------------------------------
	// Log out
	// ----------------------------------------------
	const handleLogOut = async () => await logOut();

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						type="button"
						className={cn(
							"w-full flex items-center gap-3 rounded-full transition-colors duration-200 cursor-pointer",
							"focus:outline-none focus-visible:ring-0",
							"justify-start hover:bg-secondary",
						)}
					>
						<Avatar className="h-8 w-8 flex-shrink-0">
							<AvatarImage
								// Response to an error that occurs when an empty character is passed at logout
								src={userData.avatarUrl || undefined}
								alt={userData.username}
							/>
							<AvatarFallback className="bg-muted text-muted-foreground">
								{userData.username.substring(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>
					</button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="w-56 ml-3">
					<DropdownMenuLabel className="flex flex-col space-y-1">
						<span>{userData.username}</span>
						<span className="text-xs font-normal text-muted-foreground">
							{userData.email}
						</span>
					</DropdownMenuLabel>

					<DropdownMenuSeparator />

					<DropdownMenuItem className="cursor-pointer" asChild>
						<Link href="/dashboard/account/me">
							<Settings className="mr-2 h-4 w-4" />
							<span className="text-sm">{t("accountPreferences")}</span>
						</Link>
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
						onValueChange={(value) => {
							if (isTheme(value)) {
								setTheme(value);
							}
						}}
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

					<DropdownMenuItem className="cursor-pointer p-0">
						<form action={handleLogOut} className="w-full">
							<button
								type="submit"
								className="w-full flex items-center text-sm cursor-pointer px-2 py-1.5 rounded"
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
}
