import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it, vi } from "vitest";

import { createServerClient } from "@/shared/lib/supabase/server";

import { checkUsernameExists } from "./check-username-exists";

vi.mock("@/shared/lib/supabase/server", () => ({
	createServerClient: vi.fn(),
}));

vi.mock("next-intl/server", () => ({
	getTranslations: () =>
		Promise.resolve(() => "Auth.validation.usernameAlreadyExists"),
}));

describe("checkUsernameExists", () => {
	it("should throw an error when username exists", async () => {
		// Arrange
		const mockResponse = {
			data: { id: "test-id" },
			error: null,
		};
		const mockSingle = vi.fn().mockResolvedValue(mockResponse);
		const mockIlike = vi.fn().mockReturnValue({ single: mockSingle });
		const mockSelect = vi.fn().mockReturnValue({ ilike: mockIlike });
		const mockFrom = vi.fn().mockReturnValue({ select: mockSelect });
		const mockSupabase = {
			from: mockFrom,
		} as unknown as SupabaseClient;
		vi.mocked(createServerClient).mockResolvedValue(mockSupabase);

		// Act & Assert
		await expect(checkUsernameExists("testuser")).rejects.toThrow(
			"Auth.validation.usernameAlreadyExists",
		);
		expect(mockFrom).toHaveBeenCalledWith("profiles");
		expect(mockSelect).toHaveBeenCalledWith("id");
		expect(mockIlike).toHaveBeenCalledWith("username", "testuser");
		expect(mockSingle).toHaveBeenCalled();
	});

	it("should not throw an error when username does not exist", async () => {
		// Arrange
		const mockResponse = {
			data: null,
			error: null,
		};
		const mockSingle = vi.fn().mockResolvedValue(mockResponse);
		const mockIlike = vi.fn().mockReturnValue({ single: mockSingle });
		const mockSelect = vi.fn().mockReturnValue({ ilike: mockIlike });
		const mockFrom = vi.fn().mockReturnValue({ select: mockSelect });
		const mockSupabase = {
			from: mockFrom,
		} as unknown as SupabaseClient;
		vi.mocked(createServerClient).mockResolvedValue(mockSupabase);

		// Act
		await checkUsernameExists("testuser");

		// Assert
		expect(mockFrom).toHaveBeenCalledWith("profiles");
		expect(mockSelect).toHaveBeenCalledWith("id");
		expect(mockIlike).toHaveBeenCalledWith("username", "testuser");
		expect(mockSingle).toHaveBeenCalled();
	});

	it("should not throw an error when username exists with different case", async () => {
		// Arrange
		const mockResponse = {
			data: null,
			error: null,
		};
		const mockSingle = vi.fn().mockResolvedValue(mockResponse);
		const mockIlike = vi.fn().mockReturnValue({ single: mockSingle });
		const mockSelect = vi.fn().mockReturnValue({ ilike: mockIlike });
		const mockFrom = vi.fn().mockReturnValue({ select: mockSelect });
		const mockSupabase = {
			from: mockFrom,
		} as unknown as SupabaseClient;
		vi.mocked(createServerClient).mockResolvedValue(mockSupabase);

		// Act
		await checkUsernameExists("TestUser");

		// Assert
		expect(mockFrom).toHaveBeenCalledWith("profiles");
		expect(mockSelect).toHaveBeenCalledWith("id");
		expect(mockIlike).toHaveBeenCalledWith("username", "TestUser");
		expect(mockSingle).toHaveBeenCalled();
	});
});
