import type { SupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { createServerClient } from "@/lib/supabase/server";
import { getSiteUrl } from "@/utils/url";

vi.mock("@/lib/supabase/server", () => ({
	createServerClient: vi.fn(),
}));

vi.mock("@/utils/url", () => ({
	getSiteUrl: vi.fn(),
}));

describe("GET /auth/callback", () => {
	const mockExchangeCodeForSession = vi.fn();
	const mockBaseUrl = "https://example.com";

	beforeEach(() => {
		vi.resetModules();
		// Setup createServerClient mock
		// Using unknown to bypass type checking since we only need a partial mock
		vi.mocked(createServerClient).mockResolvedValue({
			auth: {
				exchangeCodeForSession: mockExchangeCodeForSession,
			},
		} as unknown as SupabaseClient);
		// Setup getSiteUrl mock to handle path parameter
		vi.mocked(getSiteUrl).mockImplementation((path = "") => {
			return path ? `${mockBaseUrl}${path}` : mockBaseUrl;
		});
	});

	describe("when code is provided", () => {
		const mockCode = "valid-auth-code";

		beforeEach(() => {
			mockExchangeCodeForSession.mockReset();
		});

		test("redirects to baseUrl with next path when exchange succeeds", async () => {
			// Arrange
			const { GET } = await import("./route");
			mockExchangeCodeForSession.mockResolvedValue({ error: null });
			const request = new Request(
				`${mockBaseUrl}/auth/callback?code=${mockCode}&next=/dashboard`,
			);

			// Act
			const response = await GET(request);

			// Assert
			expect(mockExchangeCodeForSession).toHaveBeenCalledWith(mockCode);
			expect(response).toBeInstanceOf(NextResponse);
			expect(response.headers.get("Location")).toBe(`${mockBaseUrl}/dashboard`);
		});

		test("redirects to error page when exchange fails", async () => {
			// Arrange
			const { GET } = await import("./route");
			mockExchangeCodeForSession.mockResolvedValue({
				error: new Error("Exchange failed"),
			});
			const request = new Request(
				`${mockBaseUrl}/auth/callback?code=${mockCode}`,
			);

			// Act
			const response = await GET(request);

			// Assert
			expect(getSiteUrl).toHaveBeenCalledWith("/auth/auth-code-error");
			expect(response.headers.get("Location")).toBe(
				`${mockBaseUrl}/auth/auth-code-error`,
			);
		});
	});

	test("redirects to error page when no code is provided", async () => {
		// Arrange
		const { GET } = await import("./route");
		const request = new Request(`${mockBaseUrl}/auth/callback`);

		// Act
		const response = await GET(request);

		// Assert
		expect(getSiteUrl).toHaveBeenCalledWith("/auth/auth-code-error");
		expect(response.headers.get("Location")).toBe(
			`${mockBaseUrl}/auth/auth-code-error`,
		);
	});

	test("uses root path when next parameter is not provided", async () => {
		// Arrange
		const { GET } = await import("./route");
		const mockCode = "valid-auth-code";
		mockExchangeCodeForSession.mockResolvedValue({ error: null });
		const request = new Request(
			`${mockBaseUrl}/auth/callback?code=${mockCode}`,
		);

		// Act
		const response = await GET(request);

		// Assert
		expect(response.headers.get("Location")).toBe(`${mockBaseUrl}/`);
	});
});
