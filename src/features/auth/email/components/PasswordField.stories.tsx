import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { useForm } from "react-hook-form";

import type { EmailSignupInput } from "../schemas/auth-schema";
import { PasswordField } from "./PasswordField";

type Story = StoryObj<typeof PasswordField<"signUp">>;

const meta = {
	title: "Features/Auth/Email/PasswordField",
	component: PasswordField<"signUp">,
	parameters: {
		layout: "centered",
		formType: "signUp",
	},
	decorators: [
		(Story, context) => {
			const { register } = useForm<EmailSignupInput>();
			const { register: _, ...restArgs } = context.args;
			return <Story args={{ register, ...restArgs }} />;
		},
	],

	tags: ["autodocs"],
} satisfies Meta<typeof PasswordField<"signUp">>;

export default meta;

export const Default: Story = {
	args: {
		disabled: false,
	},
};

export const WithError: Story = {
	args: {
		disabled: false,
		error: "Password must be at least 10 characters",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};

export const DisabledWithError: Story = {
	args: {
		disabled: true,
		error: "Password must be at least 10 characters",
	},
	parameters: {
		formType: "signUp",
	},
};

// Basic input and visibility toggle test
export const InputAndToggleVisibility: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const passwordInput = canvas.getByLabelText("Password");
		const toggleButton = canvas.getByRole("button", { name: "Show password" });

		// Verify that we can input into the password field
		await userEvent.type(passwordInput, "MySecretPassword123");
		await expect(passwordInput).toHaveValue("MySecretPassword123");

		// Verify that input is hidden (password type) in initial state
		await expect(passwordInput).toHaveAttribute("type", "password");

		// Click the visibility toggle button
		await userEvent.click(toggleButton);

		// Verify that input is visible (text type)
		await expect(passwordInput).toHaveAttribute("type", "text");

		// Verify that clicking again returns to hidden state
		await userEvent.click(toggleButton);
		await expect(passwordInput).toHaveAttribute("type", "password");
	},
};

// Error message display test
export const ErrorMessageDisplay: Story = {
	args: {
		error: "Password must be at least 10 characters",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Verify that error message is displayed
		const errorMessage = canvas.getByText(
			"Password must be at least 10 characters",
		);
		await expect(errorMessage).toBeInTheDocument();
		await expect(errorMessage).toHaveAttribute("role", "alert");
	},
};

// Disabled state test
export const DisabledState: Story = {
	args: {
		disabled: true,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Get the password field
		const passwordInput = canvas.getByLabelText("Password");

		// Verify that it is disabled
		await expect(passwordInput).toBeDisabled();

		// Verify that input is not possible
		await userEvent.type(passwordInput, "test");
		await expect(passwordInput).toHaveValue("");
	},
};

// Keyboard navigation test
export const KeyboardNavigation: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Focus on the password field
		const passwordInput = canvas.getByLabelText("Password");
		await userEvent.tab();

		// Verify that password field gets focus on first tab
		await expect(passwordInput).toHaveFocus();

		// Verify that toggle button does not get focus on next tab (due to tabIndex=-1)
		await userEvent.tab();
		const toggleButton = canvas.getByRole("button", {
			name: "Show password",
		});
		await expect(toggleButton).not.toHaveFocus();
	},
};

// Long password input test
export const LongPasswordInput: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const passwordInput = canvas.getByLabelText("Password");
		// Generate a 100-character long password
		const veryLongPassword = "a".repeat(100);

		await userEvent.type(passwordInput, veryLongPassword);
		await expect(passwordInput).toHaveValue(veryLongPassword);
	},
};

// Icon toggle test
export const IconToggle: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Get the toggle button
		const toggleButton = canvas.getByRole("button", { name: /show password/i });

		// Verify that eye icon is displayed in initial state
		expect(toggleButton.querySelector("svg")).toBeInTheDocument();

		// Verify that icon changes on click
		await userEvent.click(toggleButton);

		// Verify that the displayed icon has changed
		const updatedToggleButton = canvas.getByRole("button", {
			name: /hide password/i,
		});
		expect(updatedToggleButton.querySelector("svg")).toBeInTheDocument();
	},
};
