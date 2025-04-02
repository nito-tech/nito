import { CircleCheckIcon, CircleXIcon, InfoIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Variant } from "@/components/ui/alert";
import { cn } from "@/shared/utils/cn";

const getVariantIcon = (variant: Variant) => {
	switch (variant) {
		case "info":
			return (
				<InfoIcon className="text-info-foreground dark:text-info-foreground h-5 w-5" />
			);
		case "success":
			return (
				<CircleCheckIcon className="text-success-foreground dark:text-success-foreground/70 h-5 w-5" />
			);
		case "destructive":
			return (
				<CircleXIcon className="text-destructive dark:text-invalid/70 h-5 w-5" />
			);
		default:
			return null;
	}
};

export function Notice({
	variant,
	title,
	text,
	animate = false,
	className,
}: {
	variant: Variant;
	title?: string;
	text: string;
	animate?: boolean;
	className?: string;
}) {
	return (
		<Alert
			variant={variant}
			className={cn(
				"flex items-center border-none my-2",
				animate && "animate-fade-in",
				className,
			)}
			role={variant === "destructive" ? "alert" : "status"}
			aria-live={variant === "destructive" ? "assertive" : "polite"}
		>
			<div>{getVariantIcon(variant)}</div>
			<div className={cn(variant !== "default" && "ml-2", "py-1")}>
				{title && <AlertTitle>{title}</AlertTitle>}
				<AlertDescription>{text}</AlertDescription>
			</div>
		</Alert>
	);
}
