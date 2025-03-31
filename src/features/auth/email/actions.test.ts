import { describe, expect, it, vi } from "vitest";

import { PASSWORD_MAX_LENGTH } from "@/components/form/PasswordField/password-schema";
import { USERNAME_MAX_LENGTH } from "@/components/form/UsernameField/username-schema";
import { createServerClient } from "@/lib/supabase/server";
import { logInWithEmail, signUpWithEmail } from "./actions";

// Mock Supabase client
vi.mock("@/lib/supabase/server", () => ({
	createServerClient: vi.fn(),
}));

describe("auth/email/actions", () => {
	describe("logInWithEmail", () => {
		it("should validate and accept valid login credentials", async () => {
			const mockSession = {
				user: { id: "test-user-id" },
				access_token: "test-access-token",
				refresh_token: "test-refresh-token",
			};

			const mockSupabase = {
				auth: {
					signInWithPassword: vi.fn().mockResolvedValue({
						data: { session: mockSession },
						error: null,
					}),
				},
			};
			(
				createServerClient as unknown as ReturnType<typeof vi.fn>
			).mockResolvedValue(mockSupabase);

			const validInput = {
				email: "test@example.com",
				password: "validpassword123",
			};

			const result = await logInWithEmail(validInput);
			expect(result).toEqual(mockSession);
		});

		it("should reject invalid email format", async () => {
			const invalidInput = {
				email: "invalid-email",
				password: "validpassword123",
			};

			await expect(logInWithEmail(invalidInput)).rejects.toThrow(
				"Auth.validation.emailInvalid",
			);
		});

		it("should reject short password", async () => {
			const invalidInput = {
				email: "test@example.com",
				password: "short",
			};

			await expect(logInWithEmail(invalidInput)).rejects.toThrow(
				"Auth.validation.passwordMinLength",
			);
		});

		it("should reject long password", async () => {
			const invalidInput = {
				email: "test@example.com",
				password: "a".repeat(PASSWORD_MAX_LENGTH + 1),
			};

			await expect(logInWithEmail(invalidInput)).rejects.toThrow(
				"Auth.validation.passwordMaxLength",
			);
		});

		it("should reject empty email", async () => {
			const invalidInput = {
				email: "",
				password: "validpassword123",
			};

			await expect(logInWithEmail(invalidInput)).rejects.toThrow(
				"Auth.validation.emailMinLength",
			);
		});

		it("should reject empty password", async () => {
			const invalidInput = {
				email: "test@example.com",
				password: "",
			};

			await expect(logInWithEmail(invalidInput)).rejects.toThrow(
				"Auth.validation.passwordMinLength",
			);
		});
	});

	describe("signUpWithEmail", () => {
		it("should validate and accept valid signup credentials", async () => {
			const mockSupabase = {
				auth: {
					signUp: vi.fn().mockResolvedValue({ error: null }),
				},
			};
			(
				createServerClient as unknown as ReturnType<typeof vi.fn>
			).mockResolvedValue(mockSupabase);

			const validInput = {
				email: "test@example.com",
				password: "validpassword123",
				username: "testuser",
			};

			await expect(signUpWithEmail(validInput)).resolves.not.toThrow();
		});

		it("should reject invalid email format", async () => {
			const invalidInput = {
				email: "invalid-email",
				password: "validpassword123",
				username: "testuser",
			};

			await expect(signUpWithEmail(invalidInput)).rejects.toThrow(
				"Auth.validation.emailInvalid",
			);
		});

		it("should reject short password", async () => {
			const invalidInput = {
				email: "test@example.com",
				password: "short",
				username: "testuser",
			};

			await expect(signUpWithEmail(invalidInput)).rejects.toThrow(
				"Auth.validation.passwordMinLength",
			);
		});

		it("should reject long password", async () => {
			const invalidInput = {
				email: "test@example.com",
				password: "a".repeat(PASSWORD_MAX_LENGTH + 1),
				username: "testuser",
			};

			await expect(signUpWithEmail(invalidInput)).rejects.toThrow(
				"Auth.validation.passwordMaxLength",
			);
		});

		it("should reject empty email", async () => {
			const invalidInput = {
				email: "",
				password: "validpassword123",
				username: "testuser",
			};

			await expect(signUpWithEmail(invalidInput)).rejects.toThrow(
				"Auth.validation.emailMinLength",
			);
		});

		it("should reject empty password", async () => {
			const invalidInput = {
				email: "test@example.com",
				password: "",
				username: "testuser",
			};

			await expect(signUpWithEmail(invalidInput)).rejects.toThrow(
				"Auth.validation.passwordMinLength",
			);
		});

		it("should reject empty username", async () => {
			const invalidInput = {
				email: "test@example.com",
				password: "validpassword123",
				username: "",
			};

			await expect(signUpWithEmail(invalidInput)).rejects.toThrow(
				"Auth.validation.usernameMinLength",
			);
		});

		it("should reject long username", async () => {
			const invalidInput = {
				email: "test@example.com",
				password: "validpassword123",
				username: "a".repeat(USERNAME_MAX_LENGTH + 1),
			};

			await expect(signUpWithEmail(invalidInput)).rejects.toThrow(
				"Auth.validation.usernameMaxLength",
			);
		});
	});
});
