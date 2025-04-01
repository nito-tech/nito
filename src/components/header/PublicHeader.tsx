"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import LocaleSwitcher from "@/components/LocaleSwitcher";
import ThemeToggleButton from "@/components/theme/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { isAuthPage, isPublicPage } from "@/lib/pathname";
import { cn } from "@/utils/cn";

function NavLink({
	href,
	isActive,
	title,
	isMobile = false,
	onClick = () => {},
}: {
	href: string;
	isActive: boolean;
	title: string;
	isMobile?: boolean;
	onClick?: () => void;
}) {
	return (
		<Link
			href={href}
			className={cn(
				"font-medium transition-colors hover:text-primary",
				isActive ? "text-primary" : "text-muted-foreground",
				isMobile ? "text-md" : "text-sm",
			)}
			onClick={onClick}
			aria-label={`Navigate to ${title}`}
			aria-current={isActive ? "page" : undefined}
		>
			{title}
		</Link>
	);
}

function AuthLink({
	type,
	href,
	title,
	isMobile = false,
	onClick = () => {},
}: {
	type: "logIn" | "signUp";
	href: string;
	title: string;
	isMobile?: boolean;
	onClick?: () => void;
}) {
	return (
		<Link
			href={href}
			onClick={onClick}
			className={cn(isMobile ? "flex-1" : "")}
			aria-label={`Navigate to ${title}`}
		>
			<Button
				variant={type === "logIn" ? "outline" : "default"}
				className={isMobile ? "w-full" : ""}
			>
				{title}
			</Button>
		</Link>
	);
}

export default function PublicHeader() {
	const t = useTranslations();

	const pathname = usePathname();
	const isActive = (path: string) => pathname === path;

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const isPublicPath = isPublicPage(pathname) || isAuthPage(pathname);
	if (!isPublicPath) {
		return null;
	}

	return (
		<>
			<header
				className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 relative"
				aria-label="Site header"
			>
				<div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-8 sm:px-12 md:px-16 gap-4">
					<div className="flex items-center gap-6 md:gap-24">
						<Link
							href="/"
							className="flex items-center space-x-2"
							aria-label="Nito homepage"
						>
							<span className="font-bold text-xl">Nito</span>
						</Link>

						{/* Desktop Navigation */}
						<nav
							className="hidden md:flex items-center gap-6"
							aria-label="Main navigation"
						>
							<NavLink
								href="/"
								isActive={isActive("/")}
								title={t("HomePage.title")}
							/>
							<NavLink
								href="/features"
								isActive={isActive("/features")}
								title={t("FeaturesPage.title")}
							/>
							<NavLink
								href="/pricing"
								isActive={isActive("/pricing")}
								title={t("PricingPage.title")}
							/>
						</nav>
					</div>

					{/* Desktop Actions */}
					<div
						className="hidden md:flex items-center gap-2"
						aria-label="Desktop actions"
					>
						{pathname !== "/login" && (
							<AuthLink type="logIn" href="/login" title={t("Auth.logIn")} />
						)}
						{pathname !== "/signup" && (
							<AuthLink type="signUp" href="/signup" title={t("Auth.signUp")} />
						)}
						<LocaleSwitcher />
						<ThemeToggleButton />
					</div>

					{/* Mobile Actions and Menu Button */}
					<div
						className="md:hidden flex items-center gap-2"
						aria-label="Mobile actions"
					>
						<LocaleSwitcher />
						<ThemeToggleButton />
						<Button
							type="button"
							variant="ghost"
							className="p-2 focus:outline-none"
							onClick={toggleMenu}
							aria-label={isMenuOpen ? "Close menu" : "Open menu"}
							aria-expanded={isMenuOpen}
						>
							{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</Button>
					</div>
				</div>
			</header>

			{/* Mobile menu and overlay */}
			<div
				className="fixed inset-0 top-16 md:hidden z-40 pointer-events-none"
				aria-modal="true"
				role="menu"
				aria-label="Mobile navigation"
				aria-hidden={!isMenuOpen}
			>
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
							<NavLink
								href="/"
								isActive={isActive("/")}
								title={t("HomePage.title")}
								isMobile={true}
								onClick={() => setIsMenuOpen(false)}
							/>
							<NavLink
								href="/features"
								isActive={isActive("/features")}
								title={t("FeaturesPage.title")}
								isMobile={true}
								onClick={() => setIsMenuOpen(false)}
							/>
							<NavLink
								href="/pricing"
								isActive={isActive("/pricing")}
								title={t("PricingPage.title")}
								isMobile={true}
								onClick={() => setIsMenuOpen(false)}
							/>
						</nav>

						<div
							className="mt-8 flex flex-row gap-4 w-full"
							aria-label="Authentication menu for mobile"
						>
							{pathname !== "/login" && (
								<AuthLink
									type="logIn"
									href="/login"
									title={t("Auth.logIn")}
									isMobile={true}
									onClick={() => setIsMenuOpen(false)}
								/>
							)}
							{pathname !== "/signup" && (
								<AuthLink
									type="signUp"
									href="/signup"
									title={t("Auth.signUp")}
									isMobile={true}
									onClick={() => setIsMenuOpen(false)}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
