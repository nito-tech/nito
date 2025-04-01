import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { createEmailSchema } from "@/types/schema";

import { EmailField } from "./EmailField";

const meta = {
	title: "Components/Form/EmailField",
	component: EmailField,
	parameters: {
		layout: "centered",
	},
	args: {
		name: "email",
		label: "Email",
	},
	decorators: [
		(Story, context) => {
			const t = useTranslations();
			const schema = z.object({ email: createEmailSchema(t) });

			return (
				<Form schema={schema} onSubmit={() => {}}>
					{() => <Story args={{ ...context.args }} />}
				</Form>
			);
		},
	],
	tags: ["autodocs"],
} satisfies Meta<typeof EmailField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	tags: ["code-only"],
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
	tags: ["code-only"],
};

export const CannotInputWhenDisabled: Story = {
	args: {
		disabled: true,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const emailInput = canvas.getByLabelText("Email");

		// Verify the input is disabled
		expect(emailInput).toBeDisabled();

		// Try to enter text
		await userEvent.type(emailInput, "test@example.com");

		// Verify no text was entered
		expect(emailInput).toHaveValue("");
	},
};

export const WithValidEmail: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const emailInput = canvas.getByLabelText("Email");

		// Input valid email
		await userEvent.type(emailInput, "test@example.com");
		await userEvent.tab();

		// Verify no error message
		const errorElements = canvas.queryAllByRole("alert");
		expect(errorElements.length).toBe(0);
	},
};

export const Required: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const emailInput = canvas.getByLabelText("Email");

		// Enter and then clear the input
		await userEvent.type(emailInput, "a");
		await userEvent.clear(emailInput);
		await userEvent.tab();

		// Verify the error message
		await expect(
			await canvas.findByText("Please enter your email"),
		).toBeInTheDocument();
	},
};

export const InvalidFormat: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const emailInput = canvas.getByLabelText("Email");

		// Enter an invalid email format
		await userEvent.type(emailInput, "invalid-email");
		await userEvent.tab();

		// Verify the error message
		await expect(
			await canvas.findByText("Please enter a valid email address"),
		).toBeInTheDocument();
	},
};
