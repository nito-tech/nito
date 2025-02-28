import "@testing-library/jest-dom/vitest"; // Fix type error
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import EmailSignup from "@/app/signup/components/EmailSignup";

beforeEach(() => {
	cleanup();
});

const setup = () => {
	const utils = render(<EmailSignup />);
	const emailInput = utils.getByPlaceholderText("name@example.com");
	const passwordInput = utils.getByPlaceholderText("Password");
	const submitButton = utils.getByText("Signup");
	return {
		emailInput,
		passwordInput,
		submitButton,
		...utils,
	};
};

test("renders the form with email and password inputs", () => {
	const { emailInput, passwordInput, submitButton } = setup();
	expect(emailInput).toBeInTheDocument();
	expect(passwordInput).toBeInTheDocument();
	expect(submitButton).toBeInTheDocument();
});

describe("Email input validation", () => {
	test("shows error message for empty email", async () => {
		const { emailInput, submitButton } = setup();
		fireEvent.blur(emailInput);
		fireEvent.click(submitButton);
		await waitFor(() => {
			expect(screen.getByText("Please enter your email.")).toBeInTheDocument();
		});
	});

	test("shows error message for badly formatted email", async () => {
		const { emailInput, submitButton } = setup();
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

describe("Email input validation", () => {
	test("shows error message for empty password", async () => {
		const { passwordInput, submitButton } = setup();
		fireEvent.blur(passwordInput);
		fireEvent.click(submitButton);
		await waitFor(() => {
			expect(
				screen.getByText("Please enter your password."),
			).toBeInTheDocument();
		});
	});

	test("shows error message for short password", async () => {
		const { passwordInput, submitButton } = setup();
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

describe("Form submission", () => {
	test("submits form with valid data", async () => {
		const { emailInput, passwordInput, submitButton } = setup();
		const consoleSpy = vi.spyOn(console, "log");

		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "validpassword" } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith({
				email: "test@example.com",
				password: "validpassword",
			});
		});
	});
});
