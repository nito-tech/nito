import { describe, expect, test } from "vitest";

import { isAuthPage, isAuthRequiredPage, isPublicPage } from "@/lib/pathname";

describe("Pathname helpers", () => {
	describe("isAuthPage", () => {
		test("returns true for login page", () => {
			expect(isAuthPage("/login")).toBe(true);
		});

		test("returns true for signup page", () => {
			expect(isAuthPage("/signup")).toBe(true);
		});

		test("returns true for paths starting with login", () => {
			expect(isAuthPage("/login/oauth")).toBe(true);
		});

		test("returns false for other pages", () => {
			expect(isAuthPage("/dashboard")).toBe(false);
			expect(isAuthPage("/")).toBe(false);
		});
	});

	describe("isPublicPage", () => {
		test("returns true for root path", () => {
			expect(isPublicPage("/")).toBe(true);
		});

		test("returns false for other paths", () => {
			expect(isPublicPage("/dashboard")).toBe(false);
			expect(isPublicPage("/login")).toBe(false);
		});
	});

	describe("isAuthRequiredPage", () => {
		test("returns true for protected pages", () => {
			expect(isAuthRequiredPage("/dashboard")).toBe(true);
			expect(isAuthRequiredPage("/profile")).toBe(true);
		});

		test("returns false for public pages", () => {
			expect(isAuthRequiredPage("/")).toBe(false);
		});

		test("returns false for auth pages", () => {
			expect(isAuthRequiredPage("/login")).toBe(false);
			expect(isAuthRequiredPage("/signup")).toBe(false);
		});
	});
});
