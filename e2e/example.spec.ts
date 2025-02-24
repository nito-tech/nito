import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
	await page.goto("/");

	await expect(page).toHaveTitle("Create Next App");
});

test("get learn link", async ({ page }) => {
	await page.goto("/");

	// Click the get started link.
	await page.getByRole("link", { name: "Learn" }).click();

	// Expects page to have a heading with the name of Installation.
	// await expect(
	// 	page.getByRole("heading", { name: "Installation" }),
	// ).toBeVisible();
});
