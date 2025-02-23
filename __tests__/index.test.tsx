import { cleanup, render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { beforeEach, describe, expect, test } from "vitest";

import Home from "@/app/page";
import type { Locale } from "@/i18n/config";

/**
 * Helper function to render the Home component with NextIntlClientProvider.
 */
const renderHome = async (locale: Locale) => {
	const messages = (await import(`../messages/${locale}.json`)).default;

	return render(
		<NextIntlClientProvider locale={locale} messages={messages}>
			<Home />
		</NextIntlClientProvider>,
	);
};

/**
 * Unmounts rendered components and cleans up the test environment after each test.
 * Without this, components from the previous language would be displayed during subsequent test executions.
 */
beforeEach(() => {
	cleanup();
});

describe("English", async () => {
	const locale: Locale = "en";

	test("Home", async () => {
		const { getByRole } = await renderHome(locale);
		expect(getByRole("paragraph").textContent).toBe("Hello!");
	});
});

describe("Japanese", async () => {
	const locale: Locale = "ja";

	test("Home", async () => {
		const { getByRole } = await renderHome(locale);
		expect(getByRole("paragraph").textContent).toBe("こんにちは！");
	});
});
