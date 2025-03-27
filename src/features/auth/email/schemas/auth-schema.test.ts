import { describe, expect, it } from "vitest";

import {
	createEmailLoginSchema,
	createEmailSignupSchema,
} from "../schemas/auth-schema";

const mockT = (key: string) => key;

describe("auth-schema", () => {
	describe("Email Login Schema", () => {
		it("should validate valid email and password", () => {
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

		it("should show correct error message for missing email", () => {
			const schema = createEmailLoginSchema(mockT);
			const input = {
				password: "password123",
			};
			expect(() => schema.parse(input)).toThrow(
				"Auth.validation.emailRequired",
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

	describe("Email Signup Schema", () => {
		it("should validate valid email, password, and username", () => {
			const schema = createEmailSignupSchema(mockT);
			const input = {
				email: "test@example.com",
				password: "password123",
				username: "testuser",
			};
			expect(schema.parse(input)).toEqual(input);
		});

		it("should reject invalid email format", () => {
			const schema = createEmailSignupSchema(mockT);
			const input = {
				email: "invalid-email",
				password: "password123",
				username: "testuser",
			};
			expect(() => schema.parse(input)).toThrow("Auth.validation.emailInvalid");
		});

		it("should reject short password", () => {
			const schema = createEmailSignupSchema(mockT);
			const input = {
				email: "test@example.com",
				password: "short",
				username: "testuser",
			};
			expect(() => schema.parse(input)).toThrow(
				"Auth.validation.passwordMinLength",
			);
		});

		it("should reject long username", () => {
			const schema = createEmailSignupSchema(mockT);
			const input = {
				email: "test@example.com",
				password: "password123",
				username: "a".repeat(51), // too long
			};
			expect(() => schema.parse(input)).toThrow(
				"Auth.validation.usernameMaxLength",
			);
		});

		it("should show correct error message for missing username", () => {
			const schema = createEmailSignupSchema(mockT);
			const input = {
				email: "test@example.com",
				password: "password123",
			};
			expect(() => schema.parse(input)).toThrow(
				"Auth.validation.usernameRequired",
			);
		});

		it("should show correct error message for long username", () => {
			const schema = createEmailSignupSchema(mockT);
			const input = {
				email: "test@example.com",
				password: "password123",
				username: "a".repeat(51),
			};
			expect(() => schema.parse(input)).toThrow(
				"Auth.validation.usernameMaxLength",
			);
		});
	});
});
