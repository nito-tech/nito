import { test } from "@playwright/test";

/**
 * Sign out by deleting the cookie.
 *
 * The local environment is running tests in parallel, but conflicts occur when trying to
 * change the authentication state of multiple tests at the same time.
 * Therefore, instead of manipulating the UI and pressing the sign out button,
 * we sign out by deleting the cookie.
 */
export function signOut() {
	test.use({ storageState: { cookies: [], origins: [] } });
}
