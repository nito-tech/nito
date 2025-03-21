"use client";

import {
	AlertTriangle,
	CheckCircle,
	Info,
	Loader,
	XCircle,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			icons={{
				success: <CheckCircle className="h-4 w-4 text-success-foreground" />,
				info: <Info className="h-4 w-4 text-info-foreground" />,
				warning: <AlertTriangle className="h-4 w-4 text-warning-foreground" />,
				error: <XCircle className="h-4 w-4 text-destructive" />,
				loading: (
					<Loader className="h-4 w-4 text-muted-foreground animate-spin" />
				),
			}}
			style={
				{
					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
				} as React.CSSProperties
			}
			{...props}
		/>
	);
};

export { Toaster };
