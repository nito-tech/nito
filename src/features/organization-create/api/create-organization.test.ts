import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it, vi } from "vitest";

import { createServerClient } from "@/shared/lib/supabase/server";

import { createOrganization } from "./create-organization";

vi.mock("@/shared/lib/supabase/server", () => ({
	createServerClient: vi.fn().mockResolvedValue({
		from: vi.fn().mockReturnThis(),
		insert: vi.fn().mockReturnThis(),
	} as unknown as SupabaseClient),
}));

describe("createOrganization", () => {
	it("should create an organization with valid name and slug", async () => {
		// Arrange
		const mockInsert = vi.fn().mockResolvedValue({ data: null, error: null });
		const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });
		const mockSupabase = {
			from: mockFrom,
		} as unknown as SupabaseClient;
		vi.mocked(createServerClient).mockResolvedValue(mockSupabase);

		const input = {
			data: {
				name: "Test Organization",
				slug: "test-org",
			},
		};

		// Act
		const result = await createOrganization(input);

		// Assert
		expect(result).toBeNull();
		expect(mockFrom).toHaveBeenCalledWith("organizations");
		expect(mockInsert).toHaveBeenCalledWith([
			{
				name: "Test Organization",
				// slug: "test-org",
			},
		]);
	});

	it("should throw an error when organization name is empty", async () => {
		// Arrange
		const input = {
			data: {
				name: "",
				slug: "test-org",
			},
		};

		// Act & Assert
		await expect(createOrganization(input)).rejects.toThrow(
			"Organization.validation.nameRequired",
		);
	});

	it("should throw an error when organization name contains invalid characters", async () => {
		// Arrange
		const input = {
			data: {
				name: "Test@Organization",
				slug: "test-org",
			},
		};

		// Act & Assert
		await expect(createOrganization(input)).rejects.toThrow(
			"Organization.validation.nameInvalidChars",
		);
	});

	it("should throw an error when slug is empty", async () => {
		// Arrange
		const input = {
			data: {
				name: "Test Organization",
				slug: "",
			},
		};

		// Act & Assert
		await expect(createOrganization(input)).rejects.toThrow(
			"Organization.validation.slug.required",
		);
	});

	it("should throw an error when slug format is invalid", async () => {
		// Arrange
		const input = {
			data: {
				name: "Test Organization",
				slug: "Test-Org", // Uppercase characters are included
			},
		};

		// Act & Assert
		await expect(createOrganization(input)).rejects.toThrow(
			"Organization.validation.slug.invalidFormat",
		);
	});

	it("should throw an error when slug starts with a hyphen", async () => {
		// Arrange
		const input = {
			data: {
				name: "Test Organization",
				slug: "-test-org",
			},
		};

		// Act & Assert
		await expect(createOrganization(input)).rejects.toThrow(
			"Organization.validation.slug.invalidFormat",
		);
	});

	it("should throw an error when slug ends with a hyphen", async () => {
		// Arrange
		const input = {
			data: {
				name: "Test Organization",
				slug: "test-org-",
			},
		};

		// Act & Assert
		await expect(createOrganization(input)).rejects.toThrow(
			"Organization.validation.slug.invalidFormat",
		);
	});

	it("should throw an error when Supabase returns an error", async () => {
		// Arrange
		const mockError = new Error("Database error");
		const mockInsert = vi
			.fn()
			.mockResolvedValue({ data: null, error: mockError });
		const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });
		const mockSupabase = {
			from: mockFrom,
		} as unknown as SupabaseClient;
		vi.mocked(createServerClient).mockResolvedValue(mockSupabase);

		const input = {
			data: {
				name: "Test Organization",
				slug: "test-org",
			},
		};

		// Act & Assert
		await expect(createOrganization(input)).rejects.toThrow("Database error");
	});
});
