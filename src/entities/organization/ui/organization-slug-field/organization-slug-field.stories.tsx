import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { Form } from "@/shared/ui/form";

import { OrganizationSlugSchema } from "../../model/organization-slug-schema";
import { OrganizationSlugField } from "./organization-slug-field";

const meta = {
	title: "Entities/Organization/OrganizationSlugField",
	component: OrganizationSlugField,
	parameters: {
		layout: "centered",
	},
	args: {
		name: "slug",
		label: "Organization Slug",
	},
	decorators: [
		(Story, context) => {
			const t = useTranslations();
			const schema = z.object({ slug: OrganizationSlugSchema(t) });

			return (
				<Form schema={schema} onSubmit={() => {}}>
					{() => <Story args={{ ...context.args }} />}
				</Form>
			);
		},
	],
	tags: ["autodocs"],
} satisfies Meta<typeof OrganizationSlugField>;

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
		const input = canvas.getByLabelText("Organization Slug");

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
		const input = canvas.getByLabelText("Organization Slug");

		// Enter and then clear the input
		await userEvent.type(input, "a");
		await userEvent.clear(input);
		await userEvent.tab();

		// Verify the error message
		await expect(
			await canvas.findByText("Please enter your organization slug"),
		).toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "true");
	},
};

export const InvalidFormatValidationStartWithDash: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Organization Slug");

		// Enter invalid format starting with dash
		await userEvent.clear(input);
		await userEvent.type(input, "-organization");
		await userEvent.tab();

		// Verify the error message
		await expect(
			await canvas.findByText(
				"Organization slug must be lowercase, begin with an alphanumeric character, contain only alphanumeric characters or dashes, and end with an alphanumeric character",
			),
		).toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "true");
	},
};

export const InvalidFormatValidationEndWithDash: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Organization Slug");

		// Enter invalid format ending with dash
		await userEvent.clear(input);
		await userEvent.type(input, "organization-");
		await userEvent.tab();

		// Verify the error message
		await expect(
			await canvas.findByText(
				"Organization slug must be lowercase, begin with an alphanumeric character, contain only alphanumeric characters or dashes, and end with an alphanumeric character",
			),
		).toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "true");
	},
};

export const InvalidFormatValidationUpperCase: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Organization Slug");

		// Enter invalid format with uppercase letters
		await userEvent.clear(input);
		await userEvent.type(input, "Organization");
		await userEvent.tab();

		// Verify the error message
		await expect(
			await canvas.findByText(
				"Organization slug must be lowercase, begin with an alphanumeric character, contain only alphanumeric characters or dashes, and end with an alphanumeric character",
			),
		).toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "true");
	},
};

export const InvalidFormatValidationSpecialChars: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Organization Slug");

		// Enter invalid format with special characters
		await userEvent.clear(input);
		await userEvent.type(input, "organization@");
		await userEvent.tab();

		// Verify the error message
		await expect(
			await canvas.findByText(
				"Organization slug must be lowercase, begin with an alphanumeric character, contain only alphanumeric characters or dashes, and end with an alphanumeric character",
			),
		).toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "true");
	},
};

export const ValidInputValidation: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Organization Slug");

		// Enter valid characters
		await userEvent.clear(input);
		await userEvent.type(input, "valid-organization");
		await userEvent.tab();

		// Verify no error message is shown
		await expect(
			canvas.queryByText("Please enter your organization slug"),
		).not.toBeInTheDocument();

		await expect(
			canvas.queryByText(
				"Organization slug must be lowercase, begin with an alphanumeric character, contain only alphanumeric characters or dashes, and end with an alphanumeric character",
			),
		).not.toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "false");
	},
};

// TODO: Removing spaces and converting uppercase to lowercase is done on the server side.

// export const AutoLowerCaseConversion: Story = {
// 	tags: ["validation"],
// 	play: async ({ canvasElement }) => {
// 		const canvas = within(canvasElement);
// 		const input = canvas.getByLabelText("Organization Slug");

// 		// Enter mixed case characters
// 		await userEvent.clear(input);
// 		await userEvent.type(input, "Valid-Organization");
// 		await userEvent.tab();

// 		// Verify the input is converted to lowercase
// 		expect(input).toHaveValue("valid-organization");

// 		// Verify no error message is shown
// 		await expect(
// 			canvas.queryByText("Please enter your organization slug"),
// 		).not.toBeInTheDocument();

// 		await expect(
// 			canvas.queryByText(
// 				"Organization slug must be lowercase, begin with an alphanumeric character, contain only alphanumeric characters or dashes, and end with an alphanumeric character",
// 			),
// 		).not.toBeInTheDocument();

// 		await expect(input).toHaveAttribute("aria-invalid", "false");
// 	},
// };

// export const AutoRemoveInvalidChars: Story = {
// 	tags: ["validation"],
// 	play: async ({ canvasElement }) => {
// 		const canvas = within(canvasElement);
// 		const input = canvas.getByLabelText("Organization Slug");

// 		// Enter invalid characters
// 		await userEvent.clear(input);
// 		await userEvent.type(input, "valid@organization");
// 		await userEvent.tab();

// 		// Verify invalid characters are removed
// 		expect(input).toHaveValue("validorganization");

// 		// Verify no error message is shown
// 		await expect(
// 			canvas.queryByText("Please enter your organization slug"),
// 		).not.toBeInTheDocument();

// 		await expect(
// 			canvas.queryByText(
// 				"Organization slug must be lowercase, begin with an alphanumeric character, contain only alphanumeric characters or dashes, and end with an alphanumeric character",
// 			),
// 		).not.toBeInTheDocument();

// 		await expect(input).toHaveAttribute("aria-invalid", "false");
// 	},
// };
