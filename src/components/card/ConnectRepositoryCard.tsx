import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/shared/utils/cn";

type Props = {
	title: string;
	description: string;
	iconImage: ReactNode;
	disabled: boolean;
	onClick?: () => void;
};

export function ConnectRepositoryCard({
	title,
	iconImage,
	description,
	disabled,
	onClick,
}: Props) {
	const t = useTranslations();

	return (
		<div
			className={cn(
				"rounded-lg shadow-md p-6 border border-accent-foreground max-w-md",
				disabled && "opacity-70",
			)}
		>
			<div className="flex items-center mb-4 space-x-2">
				{iconImage}
				<h3 className="text-lg font-medium">{title}</h3>
			</div>
			<p className="text-secondary-foreground text-sm mb-4">{description}</p>
			<Button
				disabled={disabled}
				onClick={onClick}
				className={cn("w-full py-2", disabled && "cursor-not-allowed")}
			>
				{disabled ? t("commingSoon") : t("connectToRepository")}
			</Button>
		</div>
	);
}
