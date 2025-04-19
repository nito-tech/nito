import { expect, test } from "@playwright/test";

import { logInWithEmail, logOut } from "./utils";

test.describe("Login", () => {
	// Already logged in with auth.setup.ts, log in again
	test.beforeEach(async ({ page }) => {
		await logOut(page.context());
		await logInWithEmail(page);
		await expect(page).toHaveURL("/dashboard/apple");
	});

	test("should login successfully and display user info in sidebar", async ({
		page,
	}) => {
		await expect(page.getByText("Apple Inc", { exact: true })).toBeVisible();
		// await expect(
		// 	page.getByText("saneatsu.wakana@gmail.com", { exact: true }),
		// ).toBeVisible();
	});
});
