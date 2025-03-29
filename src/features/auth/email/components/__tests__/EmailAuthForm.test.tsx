import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test/utils";
import { logInWithEmail, signUpWithEmail } from "../../actions";
import EmailAuthForm from "../EmailAuthForm";

// Mock next/navigation
vi.mock("next/navigation", () => ({
	useRouter: vi.fn(),
}));

// Mock actions
vi.mock("../../actions", () => ({
	logInWithEmail: vi.fn(),
	signUpWithEmail: vi.fn(),
	checkUsernameExists: vi.fn(),
}));

describe.skip("EmailAuthForm", () => {
	const mockRouter = {
		push: vi.fn(),
	};

	beforeEach(() => {
		vi.clearAllMocks();
		(useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
			mockRouter,
		);
	});

	afterEach(() => {
		cleanup();
	});

	describe("Unit Test", () => {
		it("should render signup form when type is signUp", () => {
			renderWithProviders(<EmailAuthForm type="signUp" />);
			expect(
				screen.getByRole("button", { name: "Sign up" }),
			).toBeInTheDocument();
			expect(screen.getByLabelText("Username")).toBeInTheDocument();
		});

		it("should render login form when type is logIn", () => {
			renderWithProviders(<EmailAuthForm type="logIn" />);
			expect(
				screen.getByRole("button", { name: "Log in" }),
			).toBeInTheDocument();
			expect(screen.queryByLabelText("Username")).not.toBeInTheDocument();
		});

		it("should apply className prop", () => {
			renderWithProviders(
				<EmailAuthForm type="logIn" className="test-class" />,
			);
			expect(screen.getByRole("form", { name: "Log in form" })).toHaveClass(
				"test-class",
			);
		});
	});

	describe("Integration Test", () => {
		describe("Form Validation", () => {
			it("should show error messages for required fields", async () => {
				renderWithProviders(<EmailAuthForm type="signUp" />);
				const submitButton = screen.getByRole("button", {
					name: "Sign up",
				});
				fireEvent.click(submitButton);

				await waitFor(() => {
					expect(
						screen.getByText("Please enter your email"),
					).toBeInTheDocument();
					expect(
						screen.getByText("Password must be at least 10 characters"),
					).toBeInTheDocument();
					expect(
						screen.getByText("Please enter your username"),
					).toBeInTheDocument();
				});
			});

			it("should show error message for invalid email format", async () => {
				renderWithProviders(<EmailAuthForm type="signUp" />);
				const emailInput = screen.getByLabelText("Email");
				fireEvent.change(emailInput, { target: { value: "invalid-email" } });
				fireEvent.blur(emailInput);

				await waitFor(() => {
					expect(
						screen.getByText("Please enter a valid email address"),
					).toBeInTheDocument();
				});
			});

			it("should show error message for short password", async () => {
				renderWithProviders(<EmailAuthForm type="signUp" />);
				const passwordInput = screen.getByLabelText("Password");
				fireEvent.change(passwordInput, { target: { value: "short" } });
				fireEvent.blur(passwordInput);

				await waitFor(() => {
					expect(
						screen.getByText("Password must be at least 10 characters"),
					).toBeInTheDocument();
				});
			});

			it("should show error message for long password", async () => {
				renderWithProviders(<EmailAuthForm type="signUp" />);
				const passwordInput = screen.getByLabelText("Password");
				fireEvent.change(passwordInput, { target: { value: "a".repeat(129) } });
				fireEvent.blur(passwordInput);

				await waitFor(() => {
					expect(
						screen.getByText("Password must be less than 128 characters"),
					).toBeInTheDocument();
				});
			});

			it("should show error message for empty username", async () => {
				renderWithProviders(<EmailAuthForm type="signUp" />);
				const usernameInput = screen.getByLabelText("Username");
				fireEvent.change(usernameInput, { target: { value: "" } });
				fireEvent.blur(usernameInput);

				await waitFor(() => {
					expect(
						screen.getByText("Please enter your username"),
					).toBeInTheDocument();
				});
			});

			it("should show error message for long username", async () => {
				renderWithProviders(<EmailAuthForm type="signUp" />);
				const usernameInput = screen.getByLabelText("Username");
				fireEvent.change(usernameInput, { target: { value: "a".repeat(51) } });
				fireEvent.blur(usernameInput);

				await waitFor(() => {
					expect(
						screen.getByText("Username must be less than 50 characters"),
					).toBeInTheDocument();
				});
			});

			it("should show error message for username with invalid characters", async () => {
				renderWithProviders(<EmailAuthForm type="signUp" />);
				const usernameInput = screen.getByLabelText("Username");
				fireEvent.change(usernameInput, { target: { value: "test@user" } });
				fireEvent.blur(usernameInput);

				await waitFor(() => {
					expect(
						screen.getByText(
							"Username can only contain lowercase letters, numbers, and underscores",
						),
					).toBeInTheDocument();
				});
			});

			it("should show error message for username with uppercase letters", async () => {
				renderWithProviders(<EmailAuthForm type="signUp" />);
				const usernameInput = screen.getByLabelText("Username");
				fireEvent.change(usernameInput, { target: { value: "TestUser" } });
				fireEvent.blur(usernameInput);

				await waitFor(() => {
					expect(
						screen.getByText(
							"Username can only contain lowercase letters, numbers, and underscores",
						),
					).toBeInTheDocument();
				});
			});

			it("should show error message for reserved username", async () => {
				renderWithProviders(<EmailAuthForm type="signUp" />);
				const usernameInput = screen.getByLabelText("Username");
				fireEvent.change(usernameInput, { target: { value: "admin" } });
				fireEvent.blur(usernameInput);

				await waitFor(() => {
					expect(
						screen.getByText("This username is not available"),
					).toBeInTheDocument();
				});
			});

			it("should accept valid usernames", async () => {
				renderWithProviders(<EmailAuthForm type="signUp" />);
				const usernameInput = screen.getByLabelText("Username");
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
					fireEvent.change(usernameInput, { target: { value: username } });
					fireEvent.blur(usernameInput);

					await waitFor(() => {
						expect(
							screen.queryByText(
								"Username can only contain lowercase letters, numbers, and underscores",
							),
						).not.toBeInTheDocument();
					});
				}
			});
		});

		describe("Form Submission", () => {
			it("should handle successful signup", async () => {
				(
					signUpWithEmail as unknown as ReturnType<typeof vi.fn>
				).mockResolvedValueOnce({
					success: true,
				});

				renderWithProviders(<EmailAuthForm type="signUp" />);

				const emailInput = screen.getByLabelText("Email");
				const passwordInput = screen.getByLabelText("Password");
				const usernameInput = screen.getByLabelText("Username");
				const submitButton = screen.getByRole("button", {
					name: "Sign up",
				});

				fireEvent.change(emailInput, { target: { value: "test@example.com" } });
				fireEvent.change(passwordInput, { target: { value: "password123" } });
				fireEvent.change(usernameInput, { target: { value: "testuser" } });
				fireEvent.click(submitButton);

				await waitFor(() => {
					expect(signUpWithEmail).toHaveBeenCalledWith({
						email: "test@example.com",
						password: "password123",
						username: "testuser",
					});
					expect(
						screen.getByText("Check your email to verify your account."),
					).toBeInTheDocument();
				});
			});

			it("should handle successful login", async () => {
				(
					logInWithEmail as unknown as ReturnType<typeof vi.fn>
				).mockResolvedValueOnce({
					success: true,
				});

				renderWithProviders(<EmailAuthForm type="logIn" />);

				const emailInput = screen.getByLabelText("Email");
				const passwordInput = screen.getByLabelText("Password");
				const submitButton = screen.getByRole("button", { name: "Log in" });

				fireEvent.change(emailInput, { target: { value: "test@example.com" } });
				fireEvent.change(passwordInput, { target: { value: "password123" } });
				fireEvent.click(submitButton);

				await waitFor(() => {
					expect(logInWithEmail).toHaveBeenCalledWith({
						email: "test@example.com",
						password: "password123",
					});
					expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
				});
			});

			it("should handle signup error", async () => {
				(
					signUpWithEmail as unknown as ReturnType<typeof vi.fn>
				).mockRejectedValueOnce(new Error("Sign up failed"));

				renderWithProviders(<EmailAuthForm type="signUp" />);

				const emailInput = screen.getByLabelText("Email");
				const passwordInput = screen.getByLabelText("Password");
				const usernameInput = screen.getByLabelText("Username");
				const submitButton = screen.getByRole("button", {
					name: "Sign up",
				});

				fireEvent.change(emailInput, { target: { value: "test@example.com" } });
				fireEvent.change(passwordInput, { target: { value: "password123" } });
				fireEvent.change(usernameInput, { target: { value: "testuser" } });
				fireEvent.click(submitButton);

				await waitFor(() => {
					expect(screen.getByText("Sign up failed")).toBeInTheDocument();
				});
			});

			it("should handle login error", async () => {
				(
					logInWithEmail as unknown as ReturnType<typeof vi.fn>
				).mockRejectedValueOnce(new Error("Log in failed"));

				renderWithProviders(<EmailAuthForm type="logIn" />);

				const emailInput = screen.getByLabelText("Email");
				const passwordInput = screen.getByLabelText("Password");
				const submitButton = screen.getByRole("button", { name: "Log in" });

				fireEvent.change(emailInput, { target: { value: "test@example.com" } });
				fireEvent.change(passwordInput, { target: { value: "password123" } });
				fireEvent.click(submitButton);

				await waitFor(() => {
					expect(screen.getByText("Log in failed")).toBeInTheDocument();
				});
			});
		});
	});
});
