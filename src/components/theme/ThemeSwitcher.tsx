"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Theme = "light" | "dark" | "system";

export type ThemeOption = {
	label: string;
	value: Theme;
	icon: React.ReactNode;
};

export const themeOptions: ThemeOption[] = [
	{ label: "Light", value: "light", icon: <Sun className="h-4 w-4" /> },
	{ label: "Dark", value: "dark", icon: <Moon className="h-4 w-4" /> },
	{
		label: "System",
		value: "system",
		icon: <Laptop className="h-4 w-4" />,
	},
];

export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// next-themes only works on the client side,
	// so only use theme information after mounting
	useEffect(() => {
		setMounted(true);
	}, []);

	// Determine icon based on current theme
	const currentIcon = () => {
		if (!mounted) return <Sun className="h-4 w-4" />;

		switch (theme) {
			case "dark":
				return <Moon className="h-4 w-4" />;
			case "light":
				return <Sun className="h-4 w-4" />;
			default:
				return <Laptop className="h-4 w-4" />;
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					aria-label="Change theme"
					data-testid="theme-toggle"
				>
					{currentIcon()}
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-36">
				<DropdownMenuRadioGroup
					value={theme}
					onValueChange={(value) => setTheme(value as Theme)}
				>
					{themeOptions.map((option) => (
						<DropdownMenuRadioItem
							key={option.value}
							value={option.value}
							className="cursor-pointer flex items-center"
						>
							<span className="mr-2">{option.icon}</span>
							{option.label}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
