"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import LocaleSwitcher from "@/components/LocaleSwitcher";
import ThemeToggleButton from "@/components/theme/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function PublicHeader() {
	const t = useTranslations();

	const pathname = usePathname();
	const isActive = (path: string) => pathname === path;

	return (
		<header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex h-16 items-center justify-between px-4 md:px-6 gap-4">
				<div className="flex items-center gap-24">
					<Link href="/" className="flex items-center space-x-2">
						{/* <Image
							src={logoSvg}
							alt="Nito Logo"
							width={32}
							height={32}
							className="h-8 w-8"
						/> */}
						<span className="font-bold text-xl">Nito</span>
					</Link>

					<nav className="hidden md:flex items-center gap-6">
						<Link
							href="/"
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary",
								isActive("/") ? "text-primary" : "text-muted-foreground",
							)}
						>
							{t("HomePage.title")}
						</Link>
						<Link
							href="/features"
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary",
								isActive("/features")
									? "text-primary"
									: "text-muted-foreground",
							)}
						>
							{t("FeaturesPage.title")}
						</Link>
						<Link
							href="/pricing"
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary",
								isActive("/pricing") ? "text-primary" : "text-muted-foreground",
							)}
						>
							{t("PricingPage.title")}
						</Link>
					</nav>
				</div>

				<div className="flex items-center gap-2">
					<Link href="/login">
						<Button variant="ghost" className="text-sm">
							{t("Auth.logIn")}
						</Button>
					</Link>
					<Link href="/signup">
						<Button className="text-sm">{t("Auth.signUp")}</Button>
					</Link>
					<LocaleSwitcher />
					<ThemeToggleButton />
				</div>
			</div>
		</header>
	);
}
