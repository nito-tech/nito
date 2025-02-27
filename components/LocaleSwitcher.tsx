"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { setUserLocale } from "@/services/locale";

type Item = {
	flag: string;
	value: Locale;
	label: string;
};

export default function LocaleSwitcher() {
	const locale = useLocale();
	const t = useTranslations("LocaleSwitcher");

	const items: Item[] = [
		{
			flag: "🇬🇧",
			value: "en",
			label: t("en"),
		},
		{
			flag: "🇯🇵",
			value: "ja",
			label: t("ja"),
		},
	];

	const [isPending, startTransition] = useTransition();

	function onChange(value: string) {
		const locale = value as Locale;
		startTransition(() => {
			setUserLocale(locale);
		});
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className={cn(isPending && "pointer-events-none opacity-60")}
					aria-label={t("label")}
				>
					<Languages />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuRadioGroup
					defaultValue={locale}
					value={locale}
					onValueChange={onChange}
				>
					{items.map((item) => (
						<DropdownMenuRadioItem
							key={item.value}
							value={item.value}
							className="hover:cursor-pointer"
						>
							{item.flag} {item.label}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
