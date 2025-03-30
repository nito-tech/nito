import { expect, test } from "@playwright/test";

import { logOut } from "./utils";

test.describe("Login", () => {
	// Already logged in with auth.setup.ts, log in again
	test.beforeEach(async ({ page }) => {
		await logOut(page.context());

		await page.goto("/login");
		await page.waitForURL("/login");
		await page.waitForSelector("form");

		const form = page.locator("form");
		const emailInput = form.getByPlaceholder("name@example.com");
		const passwordInput = form.getByPlaceholder("Password");
		const submitButton = form.getByRole("button", { name: "Log in" });

		// Email and Password is generated as seed data by supabase/seed.sql
		await emailInput.fill("saneatsu.wakana@gmail.com");
		await passwordInput.fill("Password123!");

		await submitButton.click();
		await page.waitForURL("/dashboard", { timeout: 3 * 1000 });
		await expect(page).toHaveURL("/dashboard");
	});

	test("should login successfully and display user info in sidebar", async ({
		page,
	}) => {
		await expect(page.getByText("saneatsu", { exact: true })).toBeVisible();
		await expect(
			page.getByText("saneatsu.wakana@gmail.com", { exact: true }),
		).toBeVisible();
	});
});
