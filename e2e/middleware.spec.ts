import { expect, test } from "@playwright/test";

import { signOut } from "./utils";

test.describe("page redirection testing by login status", () => {
	test.describe("when not logged in", () => {
		test.beforeEach(async ({ context }) => await signOut(context));

		test("redirects to /login when not logged in", async ({ page }) => {
			await page.goto("/dashboard");
			await page.waitForURL("/login");

			const currentPath = new URL(page.url()).pathname;
			expect(currentPath).toBe("/login");
		});

		test("does not redirect when accessing /login", async ({ page }) => {
			await page.goto("/login");
			await page.waitForURL("/login");

			const currentPath = new URL(page.url()).pathname;
			expect(currentPath).toBe("/login");
		});

		test("does not redirect when accessing /signup", async ({ page }) => {
			await page.goto("/signup");
			await page.waitForURL("/signup");

			const currentPath = new URL(page.url()).pathname;
			expect(currentPath).toBe("/signup");
		});
	});

	test.describe("when logged in", () => {
		test("redirects to /dashboard when accessing /logged", async ({ page }) => {
			await page.goto("/login");
			await page.waitForURL("/dashboard");

			const currentPath = new URL(page.url()).pathname;
			expect(currentPath).toBe("/dashboard");
		});

		test("redirects to /dashboard when accessing /signup", async ({ page }) => {
			await page.goto("/signup");
			await page.waitForURL("/dashboard");

			const currentPath = new URL(page.url()).pathname;
			expect(currentPath).toBe("/dashboard");
		});

		test("does not redirect when accessing /", async ({ page }) => {
			await page.goto("/");

			const currentPath = new URL(page.url()).pathname;
			expect(currentPath).toBe("/");
		});

		test("does not redirect when accessing /dashboard", async ({ page }) => {
			await page.goto("/dashboard");

			const currentPath = new URL(page.url()).pathname;
			expect(currentPath).toBe("/dashboard");
		});
	});
});
