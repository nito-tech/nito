import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { env } from "@/env";
import { getSiteUrl } from "@/lib/utils";

vi.mock("@/env", () => {
	return {
		env: {
			NEXT_PUBLIC_SITE_URL: undefined,
			NEXT_PUBLIC_VERCEL_URL: undefined,
		},
	};
});

describe("getSiteUrl", () => {
	// Reset environment variable stubs after each test
	afterEach(() => {
		vi.mocked(env).NEXT_PUBLIC_SITE_URL = undefined;
		vi.mocked(env).NEXT_PUBLIC_VERCEL_URL = undefined;
	});

	describe("when no environment variables are set", () => {
		beforeEach(() => {
			vi.mocked(env).NEXT_PUBLIC_SITE_URL = undefined;
			vi.mocked(env).NEXT_PUBLIC_VERCEL_URL = undefined;
		});

		test("returns localhost URL", () => {
			expect(getSiteUrl()).toBe("http://localhost:3210");
		});
	});

	describe("when only NEXT_PUBLIC_SITE_URL is set", () => {
		beforeEach(() => {
			vi.mocked(env).NEXT_PUBLIC_SITE_URL = "https://example.com";
			vi.mocked(env).NEXT_PUBLIC_VERCEL_URL = undefined;
		});

		test("returns NEXT_PUBLIC_SITE_URL", () => {
			expect(getSiteUrl()).toBe("https://example.com");
		});

		test("removes trailing slashes from URLs", () => {
			vi.mocked(env).NEXT_PUBLIC_SITE_URL = "https://example.com/";
			expect(getSiteUrl()).toBe("https://example.com");
		});

		test("adds https protocol if missing (except for localhost)", () => {
			vi.mocked(env).NEXT_PUBLIC_SITE_URL = "example.com";
			expect(getSiteUrl()).toBe("https://example.com");
		});

		describe("path joining", () => {
			beforeEach(() => {
				vi.mocked(env).NEXT_PUBLIC_SITE_URL = "https://example.com";
			});

			test("correctly appends paths with leading slash", () => {
				expect(getSiteUrl("/path")).toBe("https://example.com/path");
			});

			test("correctly appends paths without leading slash", () => {
				expect(getSiteUrl("path")).toBe("https://example.com/path");
			});

			test("handles multiple slashes in path", () => {
				vi.mocked(env).NEXT_PUBLIC_SITE_URL = "https://example.com/";
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
			vi.mocked(env).NEXT_PUBLIC_SITE_URL = undefined;
			vi.mocked(env).NEXT_PUBLIC_VERCEL_URL = "example-project.vercel.app";
		});

		test("returns NEXT_PUBLIC_VERCEL_URL with https protocol", () => {
			expect(getSiteUrl()).toBe("https://example-project.vercel.app");
		});
	});

	describe("when both environment variables are set", () => {
		beforeEach(() => {
			vi.mocked(env).NEXT_PUBLIC_SITE_URL = "https://example.com/";
			vi.mocked(env).NEXT_PUBLIC_VERCEL_URL = "example-project.vercel.app";
		});

		test("prioritizes NEXT_PUBLIC_SITE_URL over NEXT_PUBLIC_VERCEL_URL", () => {
			expect(getSiteUrl()).toBe("https://example.com");
		});
	});

	describe("when environment variables are empty strings", () => {
		beforeEach(() => {
			vi.mocked(env).NEXT_PUBLIC_SITE_URL = "";
			vi.mocked(env).NEXT_PUBLIC_VERCEL_URL = "";
		});

		test("uses localhost when environment variables are empty strings", () => {
			expect(getSiteUrl()).toBe("http://localhost:3210");
		});
	});
});
