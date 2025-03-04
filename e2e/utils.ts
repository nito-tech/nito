import type { BrowserContext } from "@playwright/test";

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
