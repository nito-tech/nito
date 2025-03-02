import "@testing-library/jest-dom/vitest"; // Fix type error
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { loginWithEmail } from "@/app/login/actions";
import { signupWithEmail } from "@/app/signup/actions";
import EmailAuthForm from "@/components/form/EmailAuthForm";

const routerPushMock = vi.fn();

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: routerPushMock,
	}),
}));

vi.mock("@/app/signup/actions", () => ({
	signupWithEmail: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/app/login/actions", () => ({
	loginWithEmail: vi.fn().mockResolvedValue(undefined),
}));

beforeEach(() => {
	cleanup();
	vi.clearAllMocks();
});

const setup = (type: "signup" | "login") => {
	const utils =
		type === "signup"
			? render(
					<EmailAuthForm type="signup" onSubmit={vi.mocked(signupWithEmail)} />,
				)
			: render(
					<EmailAuthForm type="login" onSubmit={vi.mocked(loginWithEmail)} />,
				);

	const emailInput = utils.getByPlaceholderText("name@example.com");
	const passwordInput = utils.getByPlaceholderText("Password");
	const submitButton = utils.getByRole("button", {
		name: type === "signup" ? "Signup" : "Login",
	});

	return {
		emailInput,
		passwordInput,
		submitButton,
		...utils,
	};
};

describe("Common EmailAuth functionality", () => {
	test("renders the form with email and password inputs", () => {
		const { emailInput, passwordInput, submitButton } = setup("signup");
		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(submitButton).toBeInTheDocument();
	});

	describe("Email input validation", () => {
		test("shows error message for empty email", async () => {
			const { emailInput, submitButton } = setup("signup");
			fireEvent.blur(emailInput);
			fireEvent.click(submitButton);
			await waitFor(() => {
				expect(
					screen.getByText("Please enter your email."),
				).toBeInTheDocument();
			});
		});

		test("shows error message for badly formatted email", async () => {
			const { emailInput, submitButton } = setup("signup");
			fireEvent.change(emailInput, { target: { value: "invalid-email" } });
			fireEvent.blur(emailInput);
			fireEvent.click(submitButton);
			await waitFor(() => {
				expect(
					screen.getByText("The email address is badly formatted."),
				).toBeInTheDocument();
			});
		});
	});

	describe("Password input validation", () => {
		test("shows error message for empty password", async () => {
			const { passwordInput, submitButton } = setup("signup");
			fireEvent.blur(passwordInput);
			fireEvent.click(submitButton);
			await waitFor(() => {
				expect(
					screen.getByText("Please enter your password."),
				).toBeInTheDocument();
			});
		});

		test("shows error message for short password", async () => {
			const { passwordInput, submitButton } = setup("signup");
			fireEvent.change(passwordInput, { target: { value: "short" } });
			fireEvent.blur(passwordInput);
			fireEvent.click(submitButton);
			await waitFor(() => {
				expect(
					screen.getByText("Your password must have 8 characters or more."),
				).toBeInTheDocument();
			});
		});
	});

	describe("Password visibility toggle", () => {
		test("toggles password visibility when eye icon is clicked", async () => {
			const { passwordInput } = setup("signup");
			expect(passwordInput).toHaveAttribute("type", "password");

			const toggleButton = screen.getByRole("button", {
				name: "Show password",
			});
			fireEvent.click(toggleButton);
			expect(passwordInput).toHaveAttribute("type", "text");

			fireEvent.click(toggleButton);
			expect(passwordInput).toHaveAttribute("type", "password");
		});

		test("changes icon when password visibility is toggled", async () => {
			setup("signup"); // Mounting DOM Components

			const toggleButton = screen.getByRole("button", {
				name: "Show password",
			});
			const hasEyeIcon = () =>
				toggleButton.querySelector("svg")?.classList.contains("lucide-eye") ??
				false;
			const hasEyeOffIcon = () =>
				toggleButton
					.querySelector("svg")
					?.classList.contains("lucide-eye-off") ?? false;

			expect(hasEyeIcon()).toBe(true);
			expect(hasEyeOffIcon()).toBe(false);

			fireEvent.click(toggleButton);
			expect(hasEyeIcon()).toBe(false);
			expect(hasEyeOffIcon()).toBe(true);
		});
	});
});

describe("Email Signup Form", () => {
	test("renders with correct button text for signup", () => {
		const { submitButton } = setup("signup");
		expect(submitButton).toHaveTextContent("Signup");
	});

	describe("Form submission", () => {
		test("calls signup with valid data and shows success message", async () => {
			const { emailInput, passwordInput, submitButton } = setup("signup");

			fireEvent.change(emailInput, { target: { value: "test@example.com" } });
			fireEvent.change(passwordInput, { target: { value: "validpassword" } });
			fireEvent.click(submitButton);

			expect(submitButton).toBeDisabled();

			await waitFor(() => {
				const alertElement = screen.getByRole("status");
				expect(alertElement).toBeInTheDocument();
			});

			await waitFor(() => {
				expect(
					screen.getByText("Check your email to verify your account."),
				).toBeInTheDocument();
			});

			expect(signupWithEmail).toHaveBeenCalledWith({
				email: "test@example.com",
				password: "validpassword",
			});
		});

		test("shows error message when signup fails", async () => {
			const signupMock = vi.mocked(signupWithEmail);
			signupMock.mockRejectedValueOnce(new Error("Signup failed"));

			const { emailInput, passwordInput, submitButton } = setup("signup");
			fireEvent.change(emailInput, { target: { value: "test@example.com" } });
			fireEvent.change(passwordInput, { target: { value: "validpassword" } });
			fireEvent.click(submitButton);

			expect(submitButton).toBeDisabled();

			await waitFor(() => {
				const alertElement = screen.getByRole("alert");
				expect(alertElement).toBeInTheDocument();
			});

			await waitFor(() => {
				expect(
					screen.getByText("Failed to authenticate. Please try again."),
				).toBeInTheDocument();
			});
		});
	});
});

describe("Email Login Form", () => {
	test("renders with correct button text for login", () => {
		const { submitButton } = setup("login");
		expect(submitButton).toHaveTextContent("Login");
	});

	describe("Form submission", () => {
		test("calls login with valid data and redirects to /dashboard", async () => {
			const { emailInput, passwordInput, submitButton } = setup("login");

			fireEvent.change(emailInput, { target: { value: "test@example.com" } });
			fireEvent.change(passwordInput, { target: { value: "validpassword" } });
			fireEvent.click(submitButton);

			expect(submitButton).toBeDisabled();

			await waitFor(() => {
				expect(loginWithEmail).toHaveBeenCalledWith({
					email: "test@example.com",
					password: "validpassword",
				});
			});

			expect(loginWithEmail).toHaveBeenCalledWith({
				email: "test@example.com",
				password: "validpassword",
			});

			// 本当にリダイレクトしているかはわからないのでPlaywrightで確かめる
			await waitFor(() => {
				expect(routerPushMock).toHaveBeenCalledWith("/dashboard");
			});
		});

		test("shows error message when login fails", async () => {
			const loginMock = vi.mocked(loginWithEmail);
			loginMock.mockRejectedValueOnce(new Error("Login failed"));

			const { emailInput, passwordInput, submitButton } = setup("login");

			fireEvent.change(emailInput, { target: { value: "test@example.com" } });
			fireEvent.change(passwordInput, { target: { value: "validpassword" } });
			fireEvent.click(submitButton);

			expect(submitButton).toBeDisabled();

			await waitFor(() => {
				const alertElement = screen.getByRole("alert");
				expect(alertElement).toBeInTheDocument();
			});

			await waitFor(() => {
				expect(
					screen.getByText("Failed to authenticate. Please try again."),
				).toBeInTheDocument();
			});
		});
	});
});
