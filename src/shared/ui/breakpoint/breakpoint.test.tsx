import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { Breakpoint } from "./breakpoint";

const breakpoints = {
	xs: 0,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
};

describe("Breakpoint", () => {
	afterEach(() => {
		cleanup();
	});

	describe("in development environment", () => {
		beforeEach(() => {
			// FIXME: NODE_ENVが更新されずに "test" のままになっている
			vi.stubEnv("NODE_ENV", "development");
		});

		test("renders breakpoint indicator", () => {
			const { unmount } = render(<Breakpoint />);

			// Verify that the component exists
			const element = screen.getByTestId("breakpoint-indicator");
			expect(element).toHaveClass("flex", "items-center", "justify-center");

			unmount();
		});

		describe("responsive breakpoint display", () => {
			const setViewportSize = (width: number) => {
				window.innerWidth = width;
				window.dispatchEvent(new Event("resize"));
			};

			beforeEach(() => {
				render(<Breakpoint />);
			});

			test("shows xs breakpoint for mobile screens", () => {
				setViewportSize(breakpoints.xs + 1);

				const xsElement = screen.getByTestId("breakpoint-xs");
				expect(xsElement).not.toHaveClass("sr-only");
				expect(xsElement).toHaveTextContent("xs");

				// Hide other breakpoints
				expect(screen.getByTestId("breakpoint-sm")).toHaveClass("sr-only");
				expect(screen.getByTestId("breakpoint-md")).toHaveClass("sr-only");
				expect(screen.getByTestId("breakpoint-lg")).toHaveClass("sr-only");
				expect(screen.getByTestId("breakpoint-xl")).toHaveClass("sr-only");
				expect(screen.getByTestId("breakpoint-2xl")).toHaveClass("sr-only");
			});

			test("shows sm breakpoint for small screens", () => {
				setViewportSize(breakpoints.sm + 1);

				expect(screen.getByTestId("breakpoint-xs")).toHaveClass("sm:sr-only");
				expect(screen.getByTestId("breakpoint-sm")).toHaveClass(
					"sm:not-sr-only",
				);
				expect(screen.getByTestId("breakpoint-md")).toHaveClass("sr-only");
				expect(screen.getByTestId("breakpoint-lg")).toHaveClass("sr-only");
				expect(screen.getByTestId("breakpoint-xl")).toHaveClass("sr-only");
				expect(screen.getByTestId("breakpoint-2xl")).toHaveClass("sr-only");
			});

			test("shows md breakpoint for medium screens", () => {
				setViewportSize(breakpoints.md + 1);

				expect(screen.getByTestId("breakpoint-xs")).toHaveClass("sm:sr-only");
				expect(screen.getByTestId("breakpoint-sm")).toHaveClass("md:sr-only");
				expect(screen.getByTestId("breakpoint-md")).toHaveClass(
					"md:not-sr-only",
				);
				expect(screen.getByTestId("breakpoint-lg")).toHaveClass("sr-only");
				expect(screen.getByTestId("breakpoint-xl")).toHaveClass("sr-only");
				expect(screen.getByTestId("breakpoint-2xl")).toHaveClass("sr-only");
			});

			test("shows lg breakpoint for large screens", () => {
				setViewportSize(breakpoints.lg + 1);

				expect(screen.getByTestId("breakpoint-xs")).toHaveClass("sm:sr-only");
				expect(screen.getByTestId("breakpoint-sm")).toHaveClass("md:sr-only");
				expect(screen.getByTestId("breakpoint-md")).toHaveClass("lg:sr-only");
				expect(screen.getByTestId("breakpoint-lg")).toHaveClass(
					"lg:not-sr-only",
				);
				expect(screen.getByTestId("breakpoint-xl")).toHaveClass("sr-only");
				expect(screen.getByTestId("breakpoint-2xl")).toHaveClass("sr-only");
			});

			test("shows xl breakpoint for extra large screens", () => {
				setViewportSize(breakpoints.xl + 1);

				expect(screen.getByTestId("breakpoint-xs")).toHaveClass("sm:sr-only");
				expect(screen.getByTestId("breakpoint-sm")).toHaveClass("md:sr-only");
				expect(screen.getByTestId("breakpoint-md")).toHaveClass("lg:sr-only");
				expect(screen.getByTestId("breakpoint-lg")).toHaveClass("xl:sr-only");
				expect(screen.getByTestId("breakpoint-xl")).toHaveClass(
					"xl:not-sr-only",
				);
				expect(screen.getByTestId("breakpoint-2xl")).toHaveClass("sr-only");
			});

			test("shows 2xl breakpoint for 2xl screens", () => {
				setViewportSize(breakpoints["2xl"] + 1);

				expect(screen.getByTestId("breakpoint-xs")).toHaveClass("sm:sr-only");
				expect(screen.getByTestId("breakpoint-sm")).toHaveClass("md:sr-only");
				expect(screen.getByTestId("breakpoint-md")).toHaveClass("lg:sr-only");
				expect(screen.getByTestId("breakpoint-lg")).toHaveClass("xl:sr-only");
				expect(screen.getByTestId("breakpoint-xl")).toHaveClass("2xl:sr-only");
				expect(screen.getByTestId("breakpoint-2xl")).toHaveClass(
					"2xl:not-sr-only",
				);
			});
		});
	});

	describe.skip("in production environment", () => {
		beforeEach(() => {
			// FIXME: NODE_ENVが更新されずに "test" のままになっている
			vi.stubEnv("NODE_ENV", "production");
		});

		test("does not render anything", () => {
			const { container } = render(<Breakpoint />);
			expect(container.firstChild).toBeNull();
		});
	});
});
