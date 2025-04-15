import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { Form } from "@/shared/ui/form";
import { ProjectNameSchema } from "../../model/project-name-scheama";
import { ProjectNameField } from "./project-name-field";

const meta = {
	title: "Entities/Project/ProjectNameField",
	component: ProjectNameField,
	parameters: {
		layout: "centered",
	},
	args: {
		name: "name",
		label: "Project Name",
	},
	decorators: [
		(Story, context) => {
			const t = useTranslations();
			const schema = z.object({ name: ProjectNameSchema(t) });

			return (
				<Form schema={schema} onSubmit={() => {}}>
					{() => <Story args={{ ...context.args }} />}
				</Form>
			);
		},
	],
	tags: ["autodocs"],
} satisfies Meta<typeof ProjectNameField>;

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
		const input = canvas.getByLabelText("Project Name");

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
		const input = canvas.getByLabelText("Project Name");

		// Enter and then clear the input
		await userEvent.type(input, "a");
		await userEvent.clear(input);
		await userEvent.tab();

		// Verify the error message
		await expect(
			await canvas.findByText("Project name is required"),
		).toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "true");
	},
};

export const MaxLengthValidation: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Project Name");

		// Enter a string longer than 100 characters
		const longString = "a".repeat(101);
		await userEvent.clear(input);
		await userEvent.type(input, longString);
		await userEvent.tab();

		// Verify the error message
		await expect(
			await canvas.findByText("Project name must be less than 100 characters"),
		).toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "true");
	},
};

export const FormatValidation: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Project Name");

		// Enter invalid characters
		await userEvent.clear(input);
		await userEvent.type(input, "InvalidProjectName!");
		await userEvent.tab();

		// Verify the error message
		await expect(
			await canvas.findByText(
				"Project name must be lowercase and can only contain letters, numbers, and the following characters: '.', '_', '-'",
			),
		).toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "true");
	},
};

export const SpaceValidation: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Project Name");

		// Enter a string with spaces
		await userEvent.clear(input);
		await userEvent.type(input, "project name with spaces");
		await userEvent.tab();

		// Verify the error message
		await expect(
			await canvas.findByText("Spaces are not allowed in project name"),
		).toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "true");
	},
};

export const ValidInputValidation: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText("Project Name");

		// Enter valid characters
		await userEvent.clear(input);
		await userEvent.type(input, "valid-project-name_123");
		await userEvent.tab();

		// Verify no error message is shown
		await expect(
			canvas.queryByText("Project name is required"),
		).not.toBeInTheDocument();

		await expect(
			canvas.queryByText("Project name must be less than 100 characters"),
		).not.toBeInTheDocument();

		await expect(
			canvas.queryByText(
				"Project name must be lowercase and can only contain letters, numbers, and the following characters: '.', '_', '-'",
			),
		).not.toBeInTheDocument();

		await expect(
			canvas.queryByText("Spaces are not allowed in project name"),
		).not.toBeInTheDocument();

		await expect(input).toHaveAttribute("aria-invalid", "false");
	},
};
