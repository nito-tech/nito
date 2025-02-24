"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ThemeToggleButton() {
	const { theme, setTheme } = useTheme();

	const handleClick = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={handleClick}
			aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
		>
			{theme === "light" ? (
				<Moon className="h-4 w-4" aria-hidden="true" />
			) : (
				<Sun className="h-4 w-4" aria-hidden="true" />
			)}
		</Button>
	);
}
