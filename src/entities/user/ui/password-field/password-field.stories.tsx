import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { CreatePasswordSchema } from "@/entities/user/model/password-schema";
import { Form } from "@/shared/ui/form";

import { PasswordField } from "./password-field";

const meta = {
	title: "Entities/User/PasswordField",
	component: PasswordField,
	parameters: {
		layout: "centered",
	},
	args: {
		name: "password",
		label: "Password",
	},
	decorators: [
		(Story, context) => {
			const t = useTranslations();
			const schema = z.object({ password: CreatePasswordSchema(t) });

			return (
				<Form schema={schema} onSubmit={() => {}}>
					{() => <Story args={{ ...context.args }} />}
				</Form>
			);
		},
	],
	tags: ["autodocs"],
} satisfies Meta<typeof PasswordField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	tags: ["code-only"],
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

export const CannotInputWhenDisabled: Story = {
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

export const CharacterCounter: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const passwordInput = canvas.getByLabelText("Password");

		await userEvent.type(passwordInput, "a".repeat(10));

		expect(canvas.getByText("10 / 128")).toBeInTheDocument();
	},
};

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

export const Required: Story = {
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

export const TooShort: Story = {
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

export const TooLong: Story = {
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

export const Valid: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const passwordInput = canvas.getByLabelText("Password");

		await userEvent.type(passwordInput, "Password123");
		await userEvent.tab();

		await expect(canvas.queryByText(/Password must/)).not.toBeInTheDocument();
	},
};
