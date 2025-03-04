"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import LocaleSwitcher from "@/components/LocaleSwitcher";
import ThemeToggleButton from "@/components/theme/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PublicHeader() {
	const t = useTranslations();

	const pathname = usePathname();
	const isActive = (path: string) => pathname === path;

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<>
			<header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 relative">
				<div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-8 sm:px-12 md:px-16 gap-4">
					<div className="flex items-center gap-6 md:gap-24">
						<Link href="/" className="flex items-center space-x-2">
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
									isActive("/pricing")
										? "text-primary"
										: "text-muted-foreground",
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
			</header>

			{/* Mobile menu and overlay */}
			<div className="fixed inset-0 top-16 md:hidden z-40 pointer-events-none">
				{/* Overlay and blur background */}
				<div
					className={cn(
						"absolute inset-0 bg-background/80 backdrop-blur-sm z-0 transition-opacity duration-300 ease-in-out pointer-events-auto",
						isMenuOpen ? "opacity-100" : "opacity-0",
					)}
					style={{ visibility: isMenuOpen ? "visible" : "hidden" }}
				/>

				<div
					className={cn(
						"relative z-10 bg-background border-t border-border/40 h-full transition-all duration-300 ease-in-out opacity-0 scale-95 pointer-events-auto",
						isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95",
					)}
				>
					<div className="px-8 sm:px-12 py-6 h-full overflow-y-auto">
						<nav className="flex flex-col space-y-6">
							<Link
								href="/"
								className={cn(
									"font-medium transition-colors hover:text-primary",
									isActive("/") ? "text-primary" : "text-muted-foreground",
								)}
								onClick={() => setIsMenuOpen(false)}
							>
								{t("HomePage.title")}
							</Link>
							<Link
								href="/features"
								className={cn(
									"font-medium transition-colors hover:text-primary",
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
									"font-medium transition-colors hover:text-primary",
									isActive("/pricing")
										? "text-primary"
										: "text-muted-foreground",
								)}
								onClick={() => setIsMenuOpen(false)}
							>
								{t("PricingPage.title")}
							</Link>
						</nav>

						<div className="mt-8 flex flex-row gap-4 w-full">
							{pathname !== "/login" && (
								<Link
									href="/login"
									onClick={() => setIsMenuOpen(false)}
									className="flex-1"
								>
									<Button variant="outline" className="w-full">
										{t("Auth.logIn")}
									</Button>
								</Link>
							)}
							{pathname !== "/signup" && (
								<Link
									href="/signup"
									onClick={() => setIsMenuOpen(false)}
									className="flex-1"
								>
									<Button className="w-full">{t("Auth.signUp")}</Button>
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
