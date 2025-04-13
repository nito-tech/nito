import path from "node:path";
import { expect, test as setup } from "@playwright/test";
import { logInWithEmail } from "./utils";

const authFile = path.join(__dirname, ".auth/user.json");

/**
 * Login by Email as part of the Playwright setup process
 *
 * Commonly called before Playwright tests are executed.
 */
setup("Login with email and password", async ({ page }) => {
	try {
		await logInWithEmail(page);
		await expect(page).toHaveURL("/dashboard/google");

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
