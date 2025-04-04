import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { Form } from "@/shared/ui/form";

import { OrganizationNameSchema } from "../../model/organization-name-schema";
import { OrganizationNameField } from "./organization-name-field";

const meta = {
	title: "Entities/Organization/OrganizationNameField",
	component: OrganizationNameField,
	parameters: {
		layout: "centered",
	},
	args: {
		name: "name",
		label: "Organization Name",
	},
	decorators: [
		(Story, context) => {
			const t = useTranslations();
			const schema = z.object({ name: OrganizationNameSchema(t) });

			return (
				<Form schema={schema} onSubmit={() => {}}>
					{() => <Story args={{ ...context.args }} />}
				</Form>
			);
		},
	],
	tags: ["autodocs"],
} satisfies Meta<typeof OrganizationNameField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	tags: ["code-only"],
};

export const WithCustomLabel: Story = {
	args: {
		label: "Custom Label",
	},
	tags: ["code-only"],
};

export const WithCustomPlaceholder: Story = {
	args: {
		placeholder: "Custom Placeholder",
	},
	tags: ["code-only"],
};

export const Required: Story = {
	args: {
		required: true,
	},
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
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Organization Name");

		// Verify the input is disabled
		expect(input).toBeDisabled();

		// Try to enter text
		await userEvent.type(input, "test");

		// Verify no text was entered
		expect(input).toHaveValue("");
	},
};

// Play function for testing validation
export const RequiredValidation: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Organization Name");

		// Enter and then clear the input
		await userEvent.type(input, "a");
		await userEvent.clear(input);
		await userEvent.tab();

		// Verify the error message
		await expect(
			await canvas.findByText("Please enter your organization name"),
		).toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "true");
	},
};

export const InvalidCharactersValidationAtSymbol: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Organization Name");

		// Enter invalid character @
		await userEvent.clear(input);
		await userEvent.type(input, "Organization@");
		await userEvent.tab();

		// Verify the error message
		await expect(
			await canvas.findByText(
				"Organization name can only contain letters, numbers, spaces, underscores, and dashes",
			),
		).toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "true");
	},
};

export const InvalidCharactersValidationHashSymbol: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Organization Name");

		// Enter invalid character #
		await userEvent.clear(input);
		await userEvent.type(input, "Organization#");
		await userEvent.tab();

		// Verify the error message
		await expect(
			await canvas.findByText(
				"Organization name can only contain letters, numbers, spaces, underscores, and dashes",
			),
		).toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "true");
	},
};

export const InvalidCharactersValidationDollarSymbol: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Organization Name");

		// Enter invalid character $
		await userEvent.clear(input);
		await userEvent.type(input, "Organization$");
		await userEvent.tab();

		// Verify the error message
		await expect(
			await canvas.findByText(
				"Organization name can only contain letters, numbers, spaces, underscores, and dashes",
			),
		).toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "true");
	},
};

export const InvalidCharactersValidationPercentSymbol: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Organization Name");

		// Enter invalid character %
		await userEvent.clear(input);
		await userEvent.type(input, "Organization%");
		await userEvent.tab();

		// Verify the error message
		await expect(
			await canvas.findByText(
				"Organization name can only contain letters, numbers, spaces, underscores, and dashes",
			),
		).toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "true");
	},
};

export const InvalidCharactersValidationAmpersandSymbol: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Organization Name");

		// Enter invalid character &
		await userEvent.clear(input);
		await userEvent.type(input, "Organization&");
		await userEvent.tab();

		// Verify the error message
		await expect(
			await canvas.findByText(
				"Organization name can only contain letters, numbers, spaces, underscores, and dashes",
			),
		).toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "true");
	},
};

export const ValidInputValidation: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Organization Name");

		// Enter valid characters
		await userEvent.clear(input);
		await userEvent.type(input, "Valid Organization Name_");
		await userEvent.tab();

		// Verify no error message is shown
		await expect(
			canvas.queryByText("Please enter your organization name"),
		).not.toBeInTheDocument();

		await expect(
			canvas.queryByText(
				"Organization name can only contain letters, numbers, spaces, underscores, and dashes",
			),
		).not.toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "false");
	},
};
