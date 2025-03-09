import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { getSiteUrl } from "@/lib/utils";

describe("getSiteUrl", () => {
	// Reset environment variable stubs after each test
	afterEach(() => {
		vi.unstubAllEnvs();
	});

	describe("when no environment variables are set", () => {
		beforeEach(() => {
			vi.stubEnv("NEXT_PUBLIC_SITE_URL", undefined);
			vi.stubEnv("NEXT_PUBLIC_VERCEL_URL", undefined);
		});

		test("returns localhost URL", () => {
			expect(getSiteUrl()).toBe("http://localhost:210");
		});
	});

	describe("when only NEXT_PUBLIC_SITE_URL is set", () => {
		beforeEach(() => {
			vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com");
			vi.stubEnv("NEXT_PUBLIC_VERCEL_URL", undefined);
		});

		test("returns NEXT_PUBLIC_SITE_URL", () => {
			expect(getSiteUrl()).toBe("https://example.com");
		});

		test("removes trailing slashes from URLs", () => {
			vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com/");
			expect(getSiteUrl()).toBe("https://example.com");
		});

		test("adds https protocol if missing (except for localhost)", () => {
			vi.stubEnv("NEXT_PUBLIC_SITE_URL", "example.com");
			expect(getSiteUrl()).toBe("https://example.com");
		});

		describe("path joining", () => {
			beforeEach(() => {
				vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com");
			});

			test("correctly appends paths with leading slash", () => {
				expect(getSiteUrl("/path")).toBe("https://example.com/path");
			});

			test("correctly appends paths without leading slash", () => {
				expect(getSiteUrl("path")).toBe("https://example.com/path");
			});

			test("handles multiple slashes in path", () => {
				vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com/");
				expect(getSiteUrl("//path")).toBe("https://example.com/path");
			});

			test("correctly handles multi-segment paths", () => {
				expect(getSiteUrl("/path/to/resource")).toBe(
					"https://example.com/path/to/resource",
				);
			});
		});
	});

	describe("when only NEXT_PUBLIC_VERCEL_URL is set", () => {
		beforeEach(() => {
			vi.stubEnv("NEXT_PUBLIC_SITE_URL", undefined);
			vi.stubEnv("NEXT_PUBLIC_VERCEL_URL", "example-project.vercel.app");
		});

		test("returns NEXT_PUBLIC_VERCEL_URL with https protocol", () => {
			expect(getSiteUrl()).toBe("https://example-project.vercel.app");
		});
	});

	describe("when both environment variables are set", () => {
		beforeEach(() => {
			vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com/");
			vi.stubEnv("NEXT_PUBLIC_VERCEL_URL", "example-project.vercel.app");
		});

		test("prioritizes NEXT_PUBLIC_SITE_URL over NEXT_PUBLIC_VERCEL_URL", () => {
			expect(getSiteUrl()).toBe("https://example.com");
		});
	});

	describe("when environment variables are empty strings", () => {
		beforeEach(() => {
			vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
			vi.stubEnv("NEXT_PUBLIC_VERCEL_URL", "");
		});

		test("uses localhost when environment variables are empty strings", () => {
			expect(getSiteUrl()).toBe("http://localhost:210");
		});
	});
});
