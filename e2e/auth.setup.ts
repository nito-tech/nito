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

	const emailInput = page.getByPlaceholder("name@example.com");
	const passwordInput = page.getByPlaceholder("Password");
	const submitButton = page.getByRole("button", { name: "Login" });
	await emailInput.fill("saneatsu.wakana@gmail.com");
	await passwordInput.fill("testtest");
	await submitButton.click();

	await page.waitForURL("/dashboard", { timeout: 3 * 1000 });
	await expect(page).toHaveURL("/dashboard");

	await page.context().storageState({ path: authFile });
});
