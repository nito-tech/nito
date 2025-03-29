import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
	type EmailSignupInput,
	type TranslationFunction,
	createEmailSignupSchema,
} from "../schemas/auth-schema";
import { PasswordField } from "./PasswordField";

type Story = StoryObj<typeof PasswordField<"signUp">>;

const meta = {
	title: "Features/Auth/Email/PasswordField",
	component: PasswordField<"signUp">,
	parameters: {
		layout: "centered",
		formType: "signUp",
	},
	args: {
		disabled: false,
	},
	decorators: [
		(Story, context) => {
			const t = useTranslations();
			const methods = useForm<EmailSignupInput>({
				mode: "onChange",
				resolver: zodResolver(
					createEmailSignupSchema(t as TranslationFunction),
				),
			});
			const { disabled } = context.args;
			context.parameters.methods = methods;
			return (
				<FormProvider {...methods}>
					<Story args={{ disabled }} />
				</FormProvider>
			);
		},
	],
	tags: ["autodocs"],
} satisfies Meta<typeof PasswordField<"signUp">>;

export default meta;

export const Default: Story = {};

export const WithError: Story = {
	play: async ({ context }) => {
		context.parameters.methods.setError("password", {
			type: "manual",
			message: "Password must be at least 10 characters",
		});
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
	},
	play: async ({ context }) => {
		context.parameters.methods.setError("password", {
			type: "manual",
			message: "Password must be at least 10 characters",
		});
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

// Note: This test may fail in Storybook UI on hot reload
// but works fine in CI and localhost:6006.
// This is due to the timing of hot reload and form validation.
export const ErrorMessageDisplay: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const passwordInput = canvas.getByLabelText("Password");

		await userEvent.type(passwordInput, "a");

		const errorMessage = await canvas.findByText(
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
		const passwordInput = canvas.getByLabelText("Password");

		// Verify that input is disabled
		await expect(passwordInput).toBeDisabled();

		// Verify that we cannot input into the password field
		await userEvent.type(passwordInput, "MySecretPassword123");
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
		const veryLongPassword = "a".repeat(129);

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
