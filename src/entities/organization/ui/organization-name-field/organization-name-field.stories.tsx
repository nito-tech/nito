import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { CreateOrganizationNameSchema } from "@/entities/organization/model/organization-name-schema";
import { CreateOrganizationSchema } from "@/features/organization-create/model/create-organization-schema";
import { Button } from "@/shared/ui/button";
import { Form } from "@/shared/ui/form";

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
			const schema = z.object({ name: CreateOrganizationNameSchema(t) });

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
		const organizationNameInput = canvas.getByLabelText("Organization Name");

		// Verify the input is disabled
		expect(organizationNameInput).toBeDisabled();

		// Try to enter text
		await userEvent.type(organizationNameInput, "test");

		// Verify no text was entered
		expect(organizationNameInput).toHaveValue("");
	},
};

// Play function for testing validation
export const RequiredValidation: Story = {
	tags: ["validation"],
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		// const organizationNameInput = await canvas.findByLabelText(
		// 	"Organization Name *",
		// );
		const organizationNameInput = canvas.getByLabelText("Organization Name");
		//
		// Enter and then clear the input
		await userEvent.type(organizationNameInput, "a");
		await userEvent.clear(organizationNameInput);
		await userEvent.tab();

		// Verify the error message
		await expect(
			await canvas.findByText("Please enter your organization name"),
		).toBeInTheDocument();

		// await expect(input).toHaveAttribute("aria-invalid", "true");

		// Test empty input validation
		// await step("Empty input validation", async () => {
		// 	const input = canvas.getByRole("textbox", {
		// 		name: "Organization Name *",
		// 	});
		// 	await userEvent.clear(input);

		// 	// Submit form
		// 	const submitButton = canvas.getByRole("button", { name: "Submit" });
		// 	await userEvent.click(submitButton);

		// 	// Wait for error message to appear
		// 	await expect(
		// 		await canvas.findByText(
		// 			"Organization name is required",
		// 			{},
		// 			{ timeout: 3000 },
		// 		),
		// 	).toBeInTheDocument();

		// 	// Check if input has error state
		// 	await expect(input).toHaveAttribute("aria-invalid", "true");
		// });
	},
};

export const WhitespaceOnlyValidation: Story = {
	args: {
		name: "name",
		required: true,
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		// Test whitespace-only input validation
		await step("Whitespace-only input validation", async () => {
			const input = canvas.getByRole("textbox", {
				name: "Organization Name *",
			});
			await userEvent.clear(input);
			await userEvent.type(input, "   ");

			// Submit form
			const submitButton = canvas.getByRole("button", { name: "Submit" });
			await userEvent.click(submitButton);

			// Wait for error message to appear
			await expect(
				await canvas.findByText(
					"Organization name is required",
					{},
					{ timeout: 3000 },
				),
			).toBeInTheDocument();

			// Check if input has error state
			await expect(input).toHaveAttribute("aria-invalid", "true");
		});
	},
};

export const ValidInputValidation: Story = {
	args: {
		name: "name",
		required: true,
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		// Test valid input
		await step("Valid input", async () => {
			const input = canvas.getByRole("textbox", {
				name: "Organization Name *",
			});
			await userEvent.clear(input);
			await userEvent.type(input, "Valid Organization Name");

			// Submit form
			const submitButton = canvas.getByRole("button", { name: "Submit" });
			await userEvent.click(submitButton);

			// Check if no error message is shown
			await expect(
				canvas.queryByText("Organization name is required"),
			).not.toBeInTheDocument();

			// Check if input has no error state
			await expect(input).toHaveAttribute("aria-invalid", "false");
		});
	},
};

export const SpecialCharactersValidation: Story = {
	args: {
		name: "name",
		required: true,
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		// Test special characters
		await step("Special characters", async () => {
			const input = canvas.getByRole("textbox", {
				name: "Organization Name *",
			});
			await userEvent.clear(input);
			await userEvent.type(input, "Organization @#$%^&*()");

			// Submit form
			const submitButton = canvas.getByRole("button", { name: "Submit" });
			await userEvent.click(submitButton);

			// Check if no error message is shown
			await expect(
				canvas.queryByText("Organization name is required"),
			).not.toBeInTheDocument();

			// Check if input has no error state
			await expect(input).toHaveAttribute("aria-invalid", "false");
		});
	},
};
