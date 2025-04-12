import { expect, test } from "@playwright/test";

test.describe.skip("Account Update", () => {
	test("should update user profile", async ({ page }) => {
		await page.goto("/dashboard");

		await test.step("Open account preferences page", async () => {
			const sidebar = page.getByRole("navigation", {
				name: "Sidebar Navigation",
			});
			await sidebar.getByRole("button", { name: /saneatsu/i }).click();
			await page.getByRole("menuitem", { name: "Account preferences" }).click();
			await expect(page).toHaveURL("/dashboard/account/me");
		});

		await test.step("Verify initial values", async () => {
			await expect(page.getByLabel("Username")).toHaveValue("saneatsu");
			await expect(page.getByLabel("Email")).toHaveValue(
				"saneatsu.wakana@gmail.com",
			);
		});

		await test.step("Username duplicate error is not displayed", async () => {
			await page.getByLabel("Username").fill("saneatsuX");
			await page.getByLabel("Username").fill("saneatsu");
			// Confirm that a duplicate error is not displayed when a user name that is already logged in is entered.
			await expect(
				page.getByText("Username is already taken"),
			).not.toBeVisible();
		});

		// await test.step("Update user info", async () => {
		// 	await username.fill("saneatsu_updated");
		// 	await email.fill("saneatsu.wakana+updated@gmail.com");
		// 	await page.getByRole("button", { name: "Update profile" }).click();
		// 	await expect(
		// 		page.getByText("Your profile has been updated!"),
		// 	).toBeVisible();
		// });

		// await test.step("Verify updated values", async () => {
		// 	await page.reload();
		// 	await expect(page.getByLabel("Username")).toHaveValue("saneatsu_updated");
		// 	await expect(page.getByLabel("Email")).toHaveValue(
		// 		"saneatsu.wakana+updated@gmail.com",
		// 	);
		// });

		// // For local test
		// await test.step("Revert user info", async () => {
		// 	await page.getByLabel("Username").fill("saneatsu");
		// 	await page.getByLabel("Email").fill("saneatsu.wakana@gmail.com");
		// 	await page.getByRole("button", { name: "Update profile" }).click();
		// 	await expect(
		// 		page.getByText("Your profile has been updated!"),
		// 	).toBeVisible();
		// });
	});
});
