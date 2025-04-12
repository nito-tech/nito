import { type Page, expect, test } from "@playwright/test";

import { logOut } from "./utils";

/**
 * Helper function to verify PublicHeader is present
 */
async function expectPublicHeaderVisible(page: Page) {
	await expect(page.getByText("Nito")).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Navigate to Home" }),
	).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Navigate to Features" }),
	).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Navigate to Pricing" }),
	).toBeVisible();
	await expect(
		page.getByRole("button", { name: "Log in" }).first(),
	).toBeVisible();
	await expect(
		page.getByRole("button", { name: "Sign up" }).first(),
	).toBeVisible();
}

/**
 * Helper function to verify PublicHeader is not present
 */
async function expectPublicHeaderNotVisible(page: Page) {
	// Check for elements that should not be visible if PublicHeader is not present
	// We check for the combination of login and signup buttons which only appear in PublicHeader
	const logInButton = page.getByRole("button", { name: "Log in" }).first();
	const signUpButton = page.getByRole("button", { name: "Sign up" }).first();

	await expect(logInButton).not.toBeVisible();
	await expect(signUpButton).not.toBeVisible();
}

test.describe("When signed out", () => {
	test.beforeEach(async ({ page }) => {
		await logOut(page.context());
	});

	test.describe("PublicHeader visibility on public pages", () => {
		test("should display PublicHeader on home page", async ({ page }) => {
			await page.goto("/");
			await expectPublicHeaderVisible(page);
		});

		test("should display PublicHeader on login page", async ({ page }) => {
			await page.goto("/login");
			await expectPublicHeaderVisible(page);
		});

		test("should display PublicHeader on signup page", async ({ page }) => {
			await page.goto("/signup");
			await expectPublicHeaderVisible(page);
		});
	});

	test.describe("PublicHeader navigation", () => {
		test("should navigate to home when clicking Home link", async ({
			page,
		}) => {
			await page.goto("/login");
			await page.getByRole("link", { name: "Navigate to Home" }).click();
			await expect(page).toHaveURL("/");
		});

		test("should navigate to login page when clicking Log in button", async ({
			page,
		}) => {
			await page.goto("/");
			await page.getByRole("button", { name: "Log in" }).click();
			await expect(page).toHaveURL("/login");
		});

		test("should navigate to signup page when clicking Sign up button", async ({
			page,
		}) => {
			await page.goto("/");
			await page.getByRole("button", { name: "Sign up" }).click();
			await expect(page).toHaveURL("/signup");
		});
	});

	test.describe("Responsive design", () => {
		test("should hide navigation links on mobile view", async ({ page }) => {
			// Set viewport to mobile size
			await page.setViewportSize({ width: 375, height: 667 });

			await page.goto("/");

			// Navigation links should be hidden on mobile
			const mainNav = page.getByLabel("Main navigation");
			await expect(mainNav).toHaveClass(/hidden md:flex/);

			// Specific nav links should not be visible on mobile
			await expect(
				page.getByRole("link", { name: "Navigate to Home" }),
			).not.toBeVisible();
			await expect(
				page.getByRole("link", { name: "Navigate to Features" }),
			).not.toBeVisible();
			await expect(
				page.getByRole("link", { name: "Navigate to Pricing" }),
			).not.toBeVisible();
		});

		test("should show mobile menu button on mobile view", async ({ page }) => {
			// Set viewport to mobile size
			await page.setViewportSize({ width: 375, height: 667 });

			await page.goto("/");

			// Nav links should be visible on mobile
			const mobileMenuButton = page.getByLabel("Open menu");
			await expect(mobileMenuButton).toBeVisible();
		});

		test("should show navigation links on desktop view", async ({ page }) => {
			// Set viewport to desktop size
			await page.setViewportSize({ width: 1280, height: 720 });

			await page.goto("/");

			// Nav links should be visible on desktop
			await expect(
				page.getByRole("link", { name: "Navigate to Home" }),
			).toBeVisible();
			await expect(
				page.getByRole("link", { name: "Navigate to Features" }),
			).toBeVisible();
			await expect(
				page.getByRole("link", { name: "Navigate to Pricing" }),
			).toBeVisible();
		});
	});

	test.describe("Mobile menu", () => {
		test("should open mobile menu when clicking menu button", async ({
			page,
		}) => {
			// Set viewport to mobile size
			await page.setViewportSize({ width: 375, height: 667 });

			await page.goto("/");

			// Mobile menu should be closed by default
			const mobileMenuButton = page.getByLabel("Open menu");
			await expect(mobileMenuButton).toBeVisible();

			// Open mobile menu
			await mobileMenuButton.click();

			// Mobile menu should be open
			const mobileMenu = page.getByRole("menu");
			await expect(mobileMenu).toBeVisible();
		});
	});
});

test.describe("When logged in", () => {
	test("should not display PublicHeader on dashboard page", async ({
		page,
	}) => {
		await page.goto("/dashboard/google");
		await page.waitForURL("/dashboard/google");
		await expectPublicHeaderNotVisible(page);
	});

	test("should display PublicHeader after logging out from dashboard", async ({
		page,
	}) => {
		await page.goto("/dashboard/google");
		await page.waitForURL("/dashboard/google");
		await expectPublicHeaderNotVisible(page);

		await logOut(page.context());

		await page.goto("/dashboard/google");
		await page.waitForURL("/login");
		await expectPublicHeaderVisible(page);
	});
});
