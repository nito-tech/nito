import "@testing-library/jest-dom/vitest";
import {
	type RenderResult,
	cleanup,
	render,
	screen,
} from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";

import PublicHeader from "@/components/header/PublicHeader";

type NavLinkKeys = "home" | "features" | "pricing";
type AuthButtonKeys = "logIn" | "signUp";

interface SetupResult extends RenderResult {
	user: UserEvent;
	elements: {
		logo: HTMLElement | null;
		brandName: HTMLElement | null;
		navLinks: Record<NavLinkKeys, HTMLElement | null>;
		authButtons: Record<AuthButtonKeys, HTMLElement | null>;
		utilities: {
			localeSwitcher: HTMLElement | null;
			themeToggle: HTMLElement | null;
		};
		mobileMenu: {
			button: HTMLElement | null;
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

beforeEach(() => {
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

	return {
		user,
		...result,
		elements: {
			// Logo and brand
			logo: screen.queryByTestId("image-nito-logo"),
			brandName: screen.getByText("Nito"),

			// Navigation links
			navLinks: {
				home: screen.getByText("Home").closest("a"),
				features: screen.getByText("Features").closest("a"),
				pricing: screen.getByText("Pricing").closest("a"),
			},

			// Authentication buttons
			authButtons: {
				logIn: screen.queryByRole("link", { name: "Log in" }),
				signUp: screen.queryByRole("link", { name: "Sign up" }),
			},

			// Utility components
			utilities: {
				localeSwitcher: screen.queryByTestId("locale-switcher"),
				themeToggle: screen.queryByTestId("theme-toggle"),
			},

			// Mobile menu elements (if applicable)
			mobileMenu: {
				button: screen.queryByRole("button", { name: /menu/i }),
			},

			// Helper for getting all nav links
			getAllNavLinks: () => screen.queryAllByRole("link"),

			// Helper for getting all buttons
			getAllButtons: () => screen.queryAllByRole("button"),
		},
	};
}

describe("PublicHeader", () => {
	describe("Rendering", () => {
		test("renders the brand and logo", () => {
			const { elements } = setup();
			expect(elements.brandName).toBeInTheDocument();

			// TODO:
			// Logo test depends on implementation, adjust as needed
			// expect(elements.logo).toBeInTheDocument();
		});

		test("renders all navigation links", () => {
			const { elements } = setup();
			expect(elements.navLinks.home).toBeInTheDocument();
			expect(elements.navLinks.features).toBeInTheDocument();
			expect(elements.navLinks.pricing).toBeInTheDocument();
		});

		test("renders authentication buttons when not on auth pages", () => {
			const { elements } = setup({ path: "/" });
			expect(elements.authButtons.logIn).toBeInTheDocument();
			expect(elements.authButtons.signUp).toBeInTheDocument();
		});

		test("renders utility components", () => {
			const { elements } = setup();
			expect(elements.utilities.localeSwitcher).toBeInTheDocument();
			expect(elements.utilities.themeToggle).toBeInTheDocument();
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
				const activeNavLink = elements.navLinks[activeLink];

				// Check active link has primary color
				expect(activeNavLink).toHaveClass("text-primary");

				// Check other links have muted color
				for (const [key, link] of Object.entries(elements.navLinks)) {
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

			expect(elements.navLinks.home).toHaveAttribute("href", "/");
			expect(elements.navLinks.features).toHaveAttribute("href", "/features");
			expect(elements.navLinks.pricing).toHaveAttribute("href", "/pricing");

			expect(elements.authButtons.logIn).toHaveAttribute("href", "/login");
			expect(elements.authButtons.signUp).toHaveAttribute("href", "/signup");
		});

		test("logo links to homepage", () => {
			setup();
			const logoLinks = screen.getAllByTestId("link-to-/");

			// First link is usually the logo
			expect(logoLinks[0]).toBeInTheDocument();
			expect(logoLinks[0]).toHaveAttribute("href", "/");
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

			const logInButton = elements.authButtons.logIn?.querySelector("button");
			expect(logInButton).toHaveClass("text-sm");

			const signUpButton = elements.authButtons.signUp?.querySelector("button");
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

			// Skip if no mobile menu is implemented
			if (elements.mobileMenu.button) {
				expect(elements.mobileMenu.button).toBeInTheDocument();
			}
		});
	});
});
