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

	try {
		await submitButton.click();
		await page.waitForURL("/dashboard", { timeout: 3 * 1000 });
		await expect(page).toHaveURL("/dashboard");

		await page.context().storageState({ path: authFile });
	} catch (error) {
		// Verify that the user is registered in https://supabase.com/dashboard/project/fnounbnxrzddmcwoykpd/auth/users
		console.error(
			"Before running the test, make sure that a user is registered in Supabase by performing a Sign Up with the email address to be used in the test.",
			error,
		);
		throw error;
	}
});
