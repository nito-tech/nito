"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import LocaleSwitcher from "@/components/LocaleSwitcher";
import ThemeToggleButton from "@/components/theme/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function PublicHeader() {
	const t = useTranslations();

	const pathname = usePathname();
	const isActive = (path: string) => pathname === path;

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			{/* bg-blue-300 */}
			<div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-8 sm:px-12 md:px-16 gap-4">
				<div className="flex items-center gap-6 md:gap-24">
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

					{/* Desktop Navigation */}
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

				{/* Desktop Actions */}
				<div className="hidden md:flex items-center gap-2">
					{pathname !== "/login" && (
						<Link href="/login">
							<Button variant="outline" className="text-sm">
								{t("Auth.logIn")}
							</Button>
						</Link>
					)}
					{pathname !== "/signup" && (
						<Link href="/signup">
							<Button className="text-sm">{t("Auth.signUp")}</Button>
						</Link>
					)}
					<LocaleSwitcher />
					<ThemeToggleButton />
				</div>

				{/* Mobile Actions and Menu Button */}
				<div className="md:hidden flex items-center gap-2">
					<LocaleSwitcher />
					<ThemeToggleButton />
					<Button
						type="button"
						variant="ghost"
						className="p-2 focus:outline-none"
						onClick={toggleMenu}
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</Button>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="md:hidden py-4 px-4 border-t border-border/40 bg-background">
					<nav className="flex flex-col space-y-4">
						<Link
							href="/"
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary",
								isActive("/") ? "text-primary" : "text-muted-foreground",
							)}
							onClick={() => setIsMenuOpen(false)}
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
							onClick={() => setIsMenuOpen(false)}
						>
							{t("FeaturesPage.title")}
						</Link>
						<Link
							href="/pricing"
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary",
								isActive("/pricing") ? "text-primary" : "text-muted-foreground",
							)}
							onClick={() => setIsMenuOpen(false)}
						>
							{t("PricingPage.title")}
						</Link>
					</nav>

					<div className="mt-6 flex flex-col space-y-3">
						{pathname !== "/login" && (
							<Link href="/login" onClick={() => setIsMenuOpen(false)}>
								<Button variant="outline" className="w-full text-sm">
									{t("Auth.logIn")}
								</Button>
							</Link>
						)}
						{pathname !== "/signup" && (
							<Link href="/signup" onClick={() => setIsMenuOpen(false)}>
								<Button className="w-full text-sm">{t("Auth.signUp")}</Button>
							</Link>
						)}
						{/* 移動済み - モバイルヘッダーに表示 */}
					</div>
				</div>
			)}
		</header>
	);
}
