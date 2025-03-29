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

export const Default: Story = {
	tags: ["code-only"],
};

export const WithError: Story = {
	args: {
		disabled: false,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Displays an error message when the password does not meet the requirements.",
			},
		},
	},
	tags: ["code-only"],
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
	parameters: {
		docs: {
			description: {
				story: "Disables the input field when loading.",
			},
		},
	},
	tags: ["code-only"],
};

export const DisabledWithError: Story = {
	args: {
		disabled: true,
	},
	parameters: {
		docs: {
			disable: true,
		},
	},
	tags: ["code-only"],
	play: async ({ context }) => {
		context.parameters.methods.setError("password", {
			type: "manual",
			message: "Password must be at least 10 characters",
		});
	},
};

export const CannotInputWhenDisabled: Story = {
	args: {
		disabled: true,
	},
	parameters: {
		docs: {
			disable: true,
		},
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

export const CharacterCounter: Story = {
	parameters: {
		docs: {
			disable: true,
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const passwordInput = canvas.getByLabelText("Password");

		await userEvent.type(passwordInput, "a".repeat(10));

		expect(canvas.getByText("10 / 128")).toBeInTheDocument();
	},
};

export const InputAndToggleVisibility: Story = {
	parameters: {
		docs: {
			disable: true,
		},
	},
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

// Keyboard navigation test
export const KeyboardNavigation: Story = {
	parameters: {
		docs: {
			disable: true,
		},
	},
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

// Icon toggle test
export const IconToggle: Story = {
	parameters: {
		docs: {
			disable: true,
		},
	},
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

export const EmptyPassword: Story = {
	parameters: {
		docs: {
			disable: true,
		},
	},
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const passwordInput = canvas.getByLabelText("Password");

		await userEvent.type(passwordInput, "test");
		await userEvent.clear(passwordInput);
		await userEvent.tab();

		await expect(
			await canvas.findByText("Password must be at least 10 characters"),
		).toBeInTheDocument();
	},
};

export const TooShortPassword: Story = {
	parameters: {
		docs: {
			disable: true,
		},
	},
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const passwordInput = canvas.getByLabelText("Password");

		await userEvent.type(passwordInput, "short");
		await userEvent.tab();

		await expect(
			await canvas.findByText("Password must be at least 10 characters"),
		).toBeInTheDocument();
	},
};

export const TooLongPassword: Story = {
	parameters: {
		docs: {
			disable: true,
		},
	},
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const passwordInput = canvas.getByLabelText("Password");

		await userEvent.type(passwordInput, "a".repeat(129));
		await userEvent.tab();

		await expect(
			await canvas.findByText("Password must be less than 128 characters"),
		).toBeInTheDocument();
	},
};

export const ValidPassword: Story = {
	parameters: {
		docs: {
			disable: true,
		},
	},
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const passwordInput = canvas.getByLabelText("Password");

		await userEvent.type(passwordInput, "Password123");
		await userEvent.tab();

		await expect(canvas.queryByText(/Password must/)).not.toBeInTheDocument();
	},
};
