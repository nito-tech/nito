import { describe, expect, it } from "vitest";
import { z } from "zod";

import {
	PASSWORD_MAX_LENGTH,
	USERNAME_MAX_LENGTH,
	createEmailLoginSchema,
	createEmailSignupSchema,
} from "../schemas/auth-schema";

const mockT = (key: string) => key;

describe("auth-schema", () => {
	describe("Email validation", () => {
		it("should validate valid email", () => {
			const schema = createEmailLoginSchema(mockT);
			const input = {
				email: "test@example.com",
				password: "password123",
			};
			expect(schema.parse(input)).toEqual(input);
		});

		it("should reject invalid email format", () => {
			const schema = createEmailLoginSchema(mockT);
			const input = {
				email: "invalid-email",
				password: "password123",
			};
			expect(() => schema.parse(input)).toThrow("Auth.validation.emailInvalid");
		});

		it("should show correct error message for missing email", () => {
			const schema = createEmailLoginSchema(mockT);
			const input = {
				password: "password123",
			};
			expect(() => schema.parse(input)).toThrow(
				"Auth.validation.emailRequired",
			);
		});
	});

	describe("Password validation", () => {
		it("should validate valid password", () => {
			const schema = createEmailLoginSchema(mockT);
			const input = {
				email: "test@example.com",
				password: "password123",
			};
			expect(schema.parse(input)).toEqual(input);
		});

		it("should reject short password", () => {
			const schema = createEmailLoginSchema(mockT);
			const input = {
				email: "test@example.com",
				password: "short",
			};
			expect(() => schema.parse(input)).toThrow(
				"Auth.validation.passwordMinLength",
			);
		});

		it("should reject long password", () => {
			const schema = createEmailLoginSchema(mockT);
			const input = {
				email: "test@example.com",
				password: "a".repeat(PASSWORD_MAX_LENGTH + 1),
			};
			expect(() => schema.parse(input)).toThrow(
				"Auth.validation.passwordMaxLength",
			);
		});

		it("should show correct error message for missing password", () => {
			const schema = createEmailLoginSchema(mockT);
			const input = {
				email: "test@example.com",
			};
			expect(() => schema.parse(input)).toThrow(
				"Auth.validation.passwordRequired",
			);
		});
	});

	describe("Username validation", () => {
		it("should validate valid username", () => {
			const schema = createEmailSignupSchema(mockT);
			const input = {
				email: "test@example.com",
				password: "password123",
				username: "testuser",
			};
			expect(schema.parse(input)).toEqual(input);
		});

		it("should reject empty username", () => {
			const schema = createEmailSignupSchema(mockT);
			const input = {
				email: "test@example.com",
				password: "password123",
				username: "",
			};
			expect(() => schema.parse(input)).toThrow(
				"Auth.validation.usernameRequired",
			);
		});

		it("should reject long username", () => {
			const schema = createEmailSignupSchema(mockT);
			const input = {
				email: "test@example.com",
				password: "password123",
				username: "a".repeat(USERNAME_MAX_LENGTH + 1),
			};
			expect(() => schema.parse(input)).toThrow(
				"Auth.validation.usernameMaxLength",
			);
		});

		it("should reject username with invalid characters", () => {
			const schema = createEmailSignupSchema(mockT);
			const input = {
				email: "test@example.com",
				password: "password123",
				username: "test@user",
			};
			expect(() => schema.parse(input)).toThrow(
				"Auth.validation.usernameInvalidChars",
			);
		});

		it("should reject username with uppercase letters", () => {
			const schema = createEmailSignupSchema(mockT);
			const input = {
				email: "test@example.com",
				password: "password123",
				username: "TestUser*",
			};
			expect(() => schema.parse(input)).toThrow(
				"Auth.validation.usernameInvalidChars",
			);
		});

		it("should accept username starting with underscore", () => {
			const schema = createEmailSignupSchema(mockT);
			const input = {
				email: "test@example.com",
				password: "password123",
				username: "_testuser",
			};
			expect(schema.parse(input)).toEqual(input);
		});

		it("should accept username ending with underscore", () => {
			const schema = createEmailSignupSchema(mockT);
			const input = {
				email: "test@example.com",
				password: "password123",
				username: "testuser_",
			};
			expect(schema.parse(input)).toEqual(input);
		});

		it("should reject reserved usernames", () => {
			const schema = createEmailSignupSchema(mockT);
			const input = {
				email: "test@example.com",
				password: "password123",
				username: "admin",
			};
			expect(() => schema.parse(input)).toThrow(
				"Auth.validation.usernameReserved",
			);
		});

		it("should accept valid usernames", () => {
			const schema = createEmailSignupSchema(mockT);
			const validUsernames = [
				"testuser",
				"test_user",
				"test123",
				"123test",
				"_test",
				"test_",
				"1test",
				"test1",
			];

			for (const username of validUsernames) {
				const input = {
					email: "test@example.com",
					password: "password123",
					username,
				};
				expect(schema.parse(input)).toEqual(input);
			}
		});
	});
});
