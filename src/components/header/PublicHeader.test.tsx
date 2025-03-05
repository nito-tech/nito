import "@testing-library/jest-dom/vitest";
import {
	type RenderResult,
	cleanup,
	render,
	screen,
	within,
} from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import PublicHeader from "@/components/header/PublicHeader";

type NavLinkKeys = "home" | "features" | "pricing";
type AuthButtonKeys = "logIn" | "signUp";

interface SetupResult extends RenderResult {
	user: UserEvent;
	elements: {
		logo: HTMLElement | null;
		brandName: HTMLElement | null;
		desktop: {
			navLinks: Record<NavLinkKeys, HTMLElement | null>;
			authButtons: Record<AuthButtonKeys, HTMLElement | null>;
			utilities: {
				localeSwitcher: HTMLElement | null;
				themeToggle: HTMLElement | null;
			};
		};
		mobile: {
			navLinks: Record<NavLinkKeys, HTMLElement | null>;
			authButtons: Record<AuthButtonKeys, HTMLElement | null>;
			utilities: {
				localeSwitcher: HTMLElement | null;
				themeToggle: HTMLElement | null;
			};
			menuButton: HTMLElement | null;
		};
		getAllNavLinks: () => HTMLElement[];
		getAllButtons: () => HTMLElement[];
	};
}

let currentPath = "/";

vi.mock("next/navigation", () => ({
	usePathname: () => currentPath,
	useRouter: () => ({
		push: vi.fn(),
	}),
}));

vi.mock("next/link", () => ({
	__esModule: true,
	default: ({
		href,
		children,
		className,
		...rest
	}: {
		href: string;
		children: React.ReactNode;
		className?: string;
		[key: string]: unknown;
	}) => (
		<a
			href={href}
			className={className}
			data-testid={`link-to-${href}`}
			{...rest}
		>
			{children}
		</a>
	),
}));

vi.mock("next/image", () => ({
	__esModule: true,
	default: ({
		src,
		alt,
		...props
	}: {
		src: string;
		alt: string;
		width?: number;
		height?: number;
		[key: string]: unknown;
	}) => (
		// biome-ignore lint/a11y/useAltText: <explanation>
		<img
			src={typeof src === "string" ? src : ""}
			alt={alt}
			data-testid={`image-${alt.toLowerCase().replace(/\s+/g, "-")}`}
			{...props}
		/>
	),
}));

vi.mock("next-intl", () => ({
	useTranslations: () => {
		return (key: string): string => {
			const translations: Record<string, string> = {
				"HomePage.title": "Home",
				"FeaturesPage.title": "Features",
				"PricingPage.title": "Pricing",
				"Auth.logIn": "Log in",
				"Auth.signUp": "Sign up",
			};
			return translations[key] || key;
		};
	},
}));

afterEach(() => {
	cleanup();
	vi.clearAllMocks();

	// Reset default path
	currentPath = "/";
});

vi.mock("@/components/LocaleSwitcher", () => ({
	__esModule: true,
	default: () => <div data-testid="locale-switcher">LocaleSwitcher</div>,
}));

vi.mock("@/components/theme/ThemeToggleButton", () => ({
	__esModule: true,
	default: () => <div data-testid="theme-toggle">ThemeToggle</div>,
}));

function setup({ path = "/" } = {}): SetupResult {
	currentPath = path;
	const user = userEvent.setup();
	const result = render(<PublicHeader />);

	const desktop = result.getByLabelText("Site header");
	const desktopUtils = within(desktop);

	const desktopNav =
		desktopUtils.queryByLabelText("Main navigation") ||
		desktopUtils.queryByRole("navigation");
	const desktopNavUtils = desktopNav ? within(desktopNav) : null;

	const desktopActions = desktopUtils.queryByLabelText("Desktop actions");
	const desktopActionsUtils = desktopActions ? within(desktopActions) : null;

	const mobile = result.getByLabelText("Mobile navigation");
	const mobileUtils = within(mobile);

	return {
		user,
		...result,
		elements: {
			logo: desktopUtils.queryByLabelText("Nito homepage"),
			brandName: desktopUtils.queryByText("Nito"),
			desktop: {
				navLinks: {
					home: desktopNavUtils?.queryByLabelText("Navigate to Home") ?? null,
					features:
						desktopNavUtils?.queryByLabelText("Navigate to Features") ?? null,
					pricing:
						desktopNavUtils?.queryByLabelText("Navigate to Pricing") ?? null,
				},
				authButtons: {
					logIn:
						desktopActionsUtils?.queryByLabelText("Navigate to Log in") ?? null,
					signUp:
						desktopActionsUtils?.queryByLabelText("Navigate to Sign up") ??
						null,
				},
				utilities: {
					localeSwitcher: desktop.querySelector(
						'.hidden.md\\:flex [data-testid="locale-switcher"]',
					),
					themeToggle: desktop.querySelector(
						'.hidden.md\\:flex [data-testid="theme-toggle"]',
					),
				},
			},
			mobile: {
				navLinks: {
					home: mobileUtils?.queryByLabelText("Navigate to Home") ?? null,
					features:
						mobileUtils?.queryByLabelText("Navigate to Features") ?? null,
					pricing: mobileUtils?.queryByLabelText("Navigate to Pricing") ?? null,
				},
				authButtons: {
					logIn: mobileUtils?.queryByLabelText("Navigate to Log in") ?? null,
					signUp: mobileUtils?.queryByLabelText("Navigate to Sign up") ?? null,
				},
				utilities: {
					localeSwitcher: desktop.querySelector(
						'.md\\:hidden [data-testid="locale-switcher"]',
					),
					themeToggle: desktop.querySelector(
						'.md\\:hidden [data-testid="theme-toggle"]',
					),
				},
				menuButton: desktopUtils.queryByLabelText("Open menu"),
			},

			// Helper methods
			getAllNavLinks: () => screen.queryAllByRole("link"),
			getAllButtons: () => screen.queryAllByRole("button"),
		},
	};
}
describe("PublicHeader", () => {
	describe("Rendering", () => {
		test("renders the brand name and logo", () => {
			const { elements } = setup();
			expect(elements.brandName).toBeInTheDocument();

			// TODO:
			// Logo test depends on implementation, adjust as needed
			// expect(elements.logo).toBeInTheDocument();
		});

		test("renders all navigation links", () => {
			const { elements } = setup();
			expect(elements.desktop.navLinks.home).toBeInTheDocument();
			expect(elements.desktop.navLinks.features).toBeInTheDocument();
			expect(elements.desktop.navLinks.pricing).toBeInTheDocument();

			expect(elements.mobile.navLinks.home).toBeInTheDocument();
			expect(elements.mobile.navLinks.features).toBeInTheDocument();
			expect(elements.mobile.navLinks.pricing).toBeInTheDocument();
		});

		test("renders authentication buttons in / page", () => {
			const { elements } = setup({ path: "/" });
			expect(elements.desktop.authButtons.logIn).toBeInTheDocument();
			expect(elements.desktop.authButtons.signUp).toBeInTheDocument();

			expect(elements.mobile.authButtons.logIn).toBeInTheDocument();
			expect(elements.mobile.authButtons.signUp).toBeInTheDocument();
		});

		test("renders utility components", () => {
			const { elements } = setup();
			expect(elements.desktop.utilities.localeSwitcher).toBeInTheDocument();
			expect(elements.desktop.utilities.themeToggle).toBeInTheDocument();

			expect(elements.mobile.utilities.localeSwitcher).toBeInTheDocument();
			expect(elements.mobile.utilities.themeToggle).toBeInTheDocument();
		});
	});

	describe("Active link highlighting", () => {
		const paths: Array<{ path: string; activeLink: NavLinkKeys }> = [
			{ path: "/", activeLink: "home" },
			{ path: "/features", activeLink: "features" },
			{ path: "/pricing", activeLink: "pricing" },
		];

		test.each(paths)(
			"highlights $activeLink link when on $path page",
			({ path, activeLink }) => {
				const { elements } = setup({ path });
				const activeNavLink = elements.desktop.navLinks[activeLink];

				// Check active link has primary color
				expect(activeNavLink).toHaveClass("text-primary");

				// Check other links have muted color
				for (const [key, link] of Object.entries(elements.desktop.navLinks)) {
					if (key !== activeLink && link) {
						expect(link).toHaveClass("text-muted-foreground");
					}
				}
			},
		);
	});

	// describe("Authentication button visibility", () => {
	// 	test("hides authentication buttons on login page", () => {
	// 		const { elements } = setup({ path: "/login" });
	// 		expect(elements.authButtons.login).not.toBeInTheDocument();
	// 		expect(elements.authButtons.signup).not.toBeInTheDocument();
	// 	});

	// 	test("hides authentication buttons on signup page", () => {
	// 		const { elements } = setup({ path: "/signup" });
	// 		expect(elements.authButtons.login).not.toBeInTheDocument();
	// 		expect(elements.authButtons.signup).not.toBeInTheDocument();
	// 	});
	// });

	describe("Link navigation", () => {
		test("all links have correct href attributes", () => {
			const { elements } = setup();

			expect(elements.desktop.navLinks.home).toHaveAttribute("href", "/");
			expect(elements.desktop.navLinks.features).toHaveAttribute(
				"href",
				"/features",
			);
			expect(elements.desktop.navLinks.pricing).toHaveAttribute(
				"href",
				"/pricing",
			);

			expect(elements.desktop.authButtons.logIn).toHaveAttribute(
				"href",
				"/login",
			);
			expect(elements.desktop.authButtons.signUp).toHaveAttribute(
				"href",
				"/signup",
			);
		});

		test("logo links to homepage", () => {
			setup();
			const logoLinks = screen.getAllByTestId("link-to-/");

			// First link is usually the logo
			expect(logoLinks[0]).toBeInTheDocument();
			expect(logoLinks[0]).toHaveAttribute("href", "/");
		});

		test("hides login button on login page", () => {
			const { elements } = setup({ path: "/login" });
			expect(elements.desktop.authButtons.logIn).not.toBeInTheDocument();
		});

		test("hides signup button on signup page", () => {
			const { elements } = setup({ path: "/signup" });
			expect(elements.desktop.authButtons.signUp).not.toBeInTheDocument();
		});
	});

	describe("Styling and accessibility", () => {
		test("header has appropriate styling", () => {
			const { container } = setup();
			const header = container.querySelector("header");

			expect(header).toHaveClass("w-full");
			expect(header).toHaveClass("border-b");
		});

		test("auth buttons have correct styling", () => {
			const { elements } = setup();

			const logInButton =
				elements.desktop.authButtons.logIn?.querySelector("button");
			expect(logInButton).toHaveClass("text-sm");

			const signUpButton =
				elements.desktop.authButtons.signUp?.querySelector("button");
			expect(signUpButton).toHaveClass("text-sm");
		});

		test("navigation is accessible", () => {
			const { container } = setup();
			const nav = container.querySelector("nav");

			expect(nav).toBeInTheDocument();
		});
	});

	describe("Responsive behavior", () => {
		test("navigation has responsive classes", () => {
			const { container } = setup();
			const nav = container.querySelector("nav");

			// Assuming navigation has responsive classes like hidden md:flex
			expect(nav).toHaveClass("hidden");
			expect(nav).toHaveClass("md:flex");
		});

		// This test depends on actual implementation
		test("mobile menu button exists on small screens (if applicable)", () => {
			const { elements } = setup();
			expect(elements.mobile.menuButton).toBeInTheDocument();
		});
	});
});
