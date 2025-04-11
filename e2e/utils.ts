import type { BrowserContext, Page } from "@playwright/test";

// Email and Password is generated as seed data by supabase/seed.sql
const LOGIN_EMAIL = "saneatsu.wakana@gmail.com";
const LOGIN_PASSWORD = "Password123!";

export async function logInWithEmail(page: Page) {
	await page.goto("/login");
	await page.waitForURL("/login");
	await page.waitForSelector("form");

	const form = page.locator("form");
	const emailInput = form.getByPlaceholder("name@example.com");
	const passwordInput = form.getByPlaceholder("Password");
	const submitButton = form.getByRole("button", { name: "Log in" });

	await emailInput.fill(LOGIN_EMAIL);
	await passwordInput.fill(LOGIN_PASSWORD);

	await submitButton.click();
	await page.waitForURL("/dashboard/google", { timeout: 5_000 });
}

/**
 * Log out by deleting the cookie.
 *
 * If you run the Supabase client and sign out, the test fails
 * because you are signed out for other tests.
 *
 * Therefore, instead of manipulating the UI and pressing the sign out button,
 * we sign out by deleting the cookie.
 */
export async function logOut(context: BrowserContext) {
	await context.clearCookies();
}
