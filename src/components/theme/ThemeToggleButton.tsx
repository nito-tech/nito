"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type ThemeOption = {
	label: string;
	value: string;
	icon: React.ReactNode;
};

const themeOptions: ThemeOption[] = [
	{ label: "Light", value: "light", icon: <Sun className="h-4 w-4" /> },
	{ label: "Dark", value: "dark", icon: <Moon className="h-4 w-4" /> },
	{
		label: "System",
		value: "system",
		icon: <Laptop className="h-4 w-4" />,
	},
];

const customRadioStyles = {
	width: "8px",
	height: "8px",
	minWidth: "8px",
	minHeight: "8px",
	aspectRatio: "1 / 1",
};

export default function ThemeToggleButton() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [open, setOpen] = useState(false);

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
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon" aria-label="Change theme">
					{currentIcon()}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-40 p-2">
				<RadioGroup
					value={theme}
					onValueChange={(value) => {
						setTheme(value);
						setOpen(false);
					}}
					className="space-y-1"
				>
					{themeOptions.map((option) => (
						<Label
							key={option.value}
							htmlFor={`theme-${option.value}`}
							className="flex items-center hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1.5 cursor-pointer w-full"
						>
							<RadioGroupItem
								value={option.value}
								id={`theme-${option.value}`}
								style={customRadioStyles}
								className={cn(
									"border-0", // Remove border
									"data-[state=checked]:border-0", // No border when checked
									"data-[state=checked]:bg-primary", // Background color when checked
									"focus-visible:ring-0", // Remove focus ring
									"focus-visible:ring-offset-0", // Remove ring offset
								)}
							/>
							<div className="flex items-center ml-2 text-sm font-normal">
								{option.icon}
								<span className="ml-2">{option.label}</span>
							</div>
						</Label>
					))}
				</RadioGroup>
			</PopoverContent>
		</Popover>
	);
}
