import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it, vi } from "vitest";

import { createServerClient } from "@/shared/lib/supabase/server";
import { checkSlugExists } from "./check-slug-exists";

vi.mock("@/shared/lib/supabase/server", () => ({
	createServerClient: vi.fn(),
}));

vi.mock("next-intl/server", () => ({
	getTranslations: () =>
		Promise.resolve(() => "Organization.validation.slug.alreadyExists"),
}));

describe("checkSlugExists", () => {
	it("should throw an error when slug exists", async () => {
		// Arrange
		const mockResponse = {
			data: null,
			error: { message: "Slug already exists" },
		};
		const mockIlike = vi.fn().mockResolvedValue(mockResponse);
		const mockSelect = vi.fn().mockReturnValue({ ilike: mockIlike });
		const mockFrom = vi.fn().mockReturnValue({ select: mockSelect });
		const mockSupabase = {
			from: mockFrom,
		} as unknown as SupabaseClient;
		vi.mocked(createServerClient).mockResolvedValue(mockSupabase);

		// Act & Assert
		await expect(checkSlugExists("test-org")).rejects.toThrow(
			"Organization.validation.slug.alreadyExists",
		);
		expect(mockFrom).toHaveBeenCalledWith("organizations");
		expect(mockSelect).toHaveBeenCalledWith("slug");
		expect(mockIlike).toHaveBeenCalledWith("slug", "test-org");
	});

	it("should not throw an error when slug does not exist", async () => {
		// Arrange
		const mockResponse = {
			data: [],
			error: null,
		};
		const mockIlike = vi.fn().mockResolvedValue(mockResponse);
		const mockSelect = vi.fn().mockReturnValue({ ilike: mockIlike });
		const mockFrom = vi.fn().mockReturnValue({ select: mockSelect });
		const mockSupabase = {
			from: mockFrom,
		} as unknown as SupabaseClient;
		vi.mocked(createServerClient).mockResolvedValue(mockSupabase);

		// Act
		const result = await checkSlugExists("test-org");

		// Assert
		expect(result).toEqual([]);
		expect(mockFrom).toHaveBeenCalledWith("organizations");
		expect(mockSelect).toHaveBeenCalledWith("slug");
		expect(mockIlike).toHaveBeenCalledWith("slug", "test-org");
	});

	it("should not throw an error when slug exists with different case", async () => {
		// Arrange
		const mockResponse = {
			data: [],
			error: null,
		};
		const mockIlike = vi.fn().mockResolvedValue(mockResponse);
		const mockSelect = vi.fn().mockReturnValue({ ilike: mockIlike });
		const mockFrom = vi.fn().mockReturnValue({ select: mockSelect });
		const mockSupabase = {
			from: mockFrom,
		} as unknown as SupabaseClient;
		vi.mocked(createServerClient).mockResolvedValue(mockSupabase);

		// Act
		const result = await checkSlugExists("Test-Org");

		// Assert
		expect(result).toEqual([]);
		expect(mockFrom).toHaveBeenCalledWith("organizations");
		expect(mockSelect).toHaveBeenCalledWith("slug");
		expect(mockIlike).toHaveBeenCalledWith("slug", "Test-Org");
	});
});
