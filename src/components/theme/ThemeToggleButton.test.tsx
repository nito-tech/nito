import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ThemeToggleButton from "@/components/theme/ThemeToggleButton";

/**
 * Unmounts rendered components and cleans up the test environment after each test.
 * Without this, components from the previous language would be displayed during subsequent test executions.
 */
afterEach(() => {
	cleanup();
});

/**
 * Mock window.matchMedia
 */
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

test("Switches to Dark mode when button is clicked in Light mode", async () => {
	const { getByRole } = render(
		<ThemeProvider attribute="class" defaultTheme="light">
			<ThemeToggleButton />
		</ThemeProvider>,
	);

	const button = getByRole("button");
	fireEvent.click(button);

	expect(document.documentElement.classList.contains("light")).toBe(false);
	expect(document.documentElement.classList.contains("dark")).toBe(true);
});

test("Switches to Light mode when button is clicked in Dark mode", async () => {
	const { getByRole } = render(
		<ThemeProvider attribute="class" defaultTheme="dark">
			<ThemeToggleButton />
		</ThemeProvider>,
	);

	const button = getByRole("button");
	fireEvent.click(button);

	expect(document.documentElement.classList.contains("dark")).toBe(false);
	expect(document.documentElement.classList.contains("light")).toBe(true);
});
