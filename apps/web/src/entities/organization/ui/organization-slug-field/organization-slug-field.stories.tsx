import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { Form } from "@/shared/ui/form";

import { OrganizationSlugSchema } from "../../model/organization-slug-schema";
import { mockCheckOrganizationSlugExists } from "../../model/useOrganizationSlug.mock";
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

export const SingleCharacterValidation: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Organization Slug");

		// Enter a single character
		await userEvent.clear(input);
		await userEvent.type(input, "a");
		await userEvent.tab();

		// Wait for debounce delay (500ms)
		await new Promise((resolve) => setTimeout(resolve, 500));

		// Check mock function called
		await expect(mockCheckOrganizationSlugExists).toHaveBeenCalledWith("a");

		// Verify no error message is shown
		await expect(
			canvas.queryByText("Please enter your organization slug"),
		).not.toBeInTheDocument();

		await expect(
			canvas.queryByText(
				"Organization slug can only contain letters, numbers, and dashes",
			),
		).not.toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "false");
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
				"Organization slug must start and end with an alphanumeric character, and cannot contain hyphens at the beginning or end",
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
				"Organization slug must start and end with an alphanumeric character, and cannot contain hyphens at the beginning or end",
			),
		).toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "true");
	},
};

export const AlreadyExistingSlug: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Organization Slug");

		// Input invalid slug
		await userEvent.clear(input);
		await userEvent.type(input, "already-exists-slug");
		await userEvent.tab();

		// Wait for debounce delay (500ms)
		// await new Promise((resolve) => setTimeout(resolve, 500));

		// Wait for error message to appear
		const errorMessage = await canvas.findByText("This slug is already taken");

		await expect(errorMessage).toBeInTheDocument();
		await expect(mockCheckOrganizationSlugExists).toHaveBeenCalledWith(
			"already-exists-slug",
		);
	},
};
