import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { env } from "@/env";
import { getSiteUrl } from "@/lib/utils";

vi.mock("@/env", () => {
	return {
		env: {
			NEXT_PUBLIC_VERCEL_URL: undefined,
		},
	};
});

describe("getSiteUrl", () => {
	// Reset environment variable stubs after each test
	afterEach(() => {
		vi.mocked(env).NEXT_PUBLIC_VERCEL_URL = undefined;
	});

	describe("when no environment variables are set", () => {
		beforeEach(() => {
			vi.mocked(env).NEXT_PUBLIC_VERCEL_URL = undefined;
		});

		test("throws an error", () => {
			expect(() => getSiteUrl()).toThrow(
				"NEXT_PUBLIC_VERCEL_URL is not set or is empty",
			);
		});
	});

	describe("when NEXT_PUBLIC_VERCEL_URL is set", () => {
		beforeEach(() => {
			vi.mocked(env).NEXT_PUBLIC_VERCEL_URL = "example-project.vercel.app";
		});

		test("returns NEXT_PUBLIC_VERCEL_URL with https protocol", () => {
			expect(getSiteUrl()).toBe("https://example-project.vercel.app");
		});

		test("removes trailing slashes from URLs", () => {
			vi.mocked(env).NEXT_PUBLIC_VERCEL_URL = "example-project.vercel.app/";
			expect(getSiteUrl()).toBe("https://example-project.vercel.app");
		});

		test("adds https protocol if missing", () => {
			vi.mocked(env).NEXT_PUBLIC_VERCEL_URL = "example-project.vercel.app";
			expect(getSiteUrl()).toBe("https://example-project.vercel.app");
		});

		describe("path joining", () => {
			beforeEach(() => {
				vi.mocked(env).NEXT_PUBLIC_VERCEL_URL = "example-project.vercel.app";
			});

			test("correctly appends paths with leading slash", () => {
				expect(getSiteUrl("/path")).toBe(
					"https://example-project.vercel.app/path",
				);
			});

			test("correctly appends paths without leading slash", () => {
				expect(getSiteUrl("path")).toBe(
					"https://example-project.vercel.app/path",
				);
			});

			test("handles multiple slashes in path", () => {
				vi.mocked(env).NEXT_PUBLIC_VERCEL_URL = "example-project.vercel.app/";
				expect(getSiteUrl("//path")).toBe(
					"https://example-project.vercel.app/path",
				);
			});

			test("correctly handles multi-segment paths", () => {
				expect(getSiteUrl("/path/to/resource")).toBe(
					"https://example-project.vercel.app/path/to/resource",
				);
			});
		});
	});

	describe("when environment variables are empty strings", () => {
		beforeEach(() => {
			vi.mocked(env).NEXT_PUBLIC_VERCEL_URL = "";
		});

		test("throws an error when environment variables are empty strings", () => {
			expect(() => getSiteUrl()).toThrow(
				"NEXT_PUBLIC_VERCEL_URL is not set or is empty",
			);
		});
	});
});
