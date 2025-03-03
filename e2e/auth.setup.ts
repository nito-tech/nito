import path from "node:path";
import { expect, test as setup } from "@playwright/test";

const authFile = path.join(__dirname, ".auth/user.json");

/**
 * Login by Email as part of the Playwright setup process
 *
 * Commonly called before Playwright tests are executed.
 */
setup("Login with email and password", async ({ page }) => {
	await page.goto("/login");

	const form = page.locator("form");
	const emailInput = form.getByPlaceholder("name@example.com");
	const passwordInput = form.getByPlaceholder("Password");
	const submitButton = form.getByRole("button", { name: "Log in" });
	await emailInput.fill("saneatsu.wakana@gmail.com");
	await passwordInput.fill("testtest");
	await submitButton.click();

	await page.waitForURL("/dashboard", { timeout: 3 * 1000 });
	await expect(page).toHaveURL("/dashboard");

	await page.context().storageState({ path: authFile });
});
