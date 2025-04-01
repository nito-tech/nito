import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useTranslations } from "next-intl";
import { FormProvider } from "react-hook-form";
import { z } from "zod";

import { mockCheckUsernameExists } from "@/features/auth/email/hooks/useUsername.mock";
import { useFormWithOnChange } from "@/hooks/useFormWithOnChange";

import { UsernameField, createUsernameSchema } from "./UsernameField";

const meta = {
	title: "Components/Form/UsernameField",
	component: UsernameField,
	parameters: {
		layout: "centered",
	},
	args: {
		name: "username",
		label: "Username",
	},
	decorators: [
		(Story, context) => {
			const t = useTranslations();
			const schema = z.object({ username: createUsernameSchema(t) });
			const form = useFormWithOnChange<z.infer<typeof schema>>({
				resolver: zodResolver(schema),
			});

			return (
				<FormProvider {...form}>
					<Story args={{ ...context.args }} />
				</FormProvider>
			);
		},
	],
	tags: ["autodocs"],
} satisfies Meta<typeof UsernameField>;

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
		const usernameInput = canvas.getByLabelText("Username");

		// Verify the input is disabled
		expect(usernameInput).toBeDisabled();

		// Try to enter text
		await userEvent.type(usernameInput, "test");

		// Verify no text was entered
		expect(usernameInput).toHaveValue("");
	},
};

export const WithValidUsername: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const usernameInput = canvas.getByLabelText("Username");

		// Input valid username
		await userEvent.type(usernameInput, "validusername");
		await userEvent.tab();

		// Wait for debounce delay (500ms)
		await new Promise((resolve) => setTimeout(resolve, 500));

		// Check mock function called
		await expect(mockCheckUsernameExists).toHaveBeenCalledWith("validusername");

		// Wait for error message to disappear
		const errorElements = canvas.queryAllByRole("alert");
		expect(errorElements.length).toBe(0);
	},
};

export const Required: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const usernameInput = canvas.getByLabelText("Username");

		// Enter and then clear the input
		await userEvent.type(usernameInput, "a");
		await userEvent.clear(usernameInput);
		await userEvent.tab();

		// Verify the error message
		await expect(
			await canvas.findByText("Please enter your username"),
		).toBeInTheDocument();
	},
};

export const TooLong: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const usernameInput = canvas.getByLabelText("Username");

		// Enter a username that's too long (51 characters)
		await userEvent.type(usernameInput, "a".repeat(51));

		// Verify the error message
		await expect(
			await canvas.findByText("Username must be less than 50 characters"),
		).toBeInTheDocument();
	},
};

export const InvalidCharacters: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const usernameInput = canvas.getByLabelText("Username");

		// Enter a username with invalid characters
		await userEvent.type(usernameInput, "user@name");

		// Verify the error message
		expect(
			canvas.getByText(
				"Username can only contain letters, numbers, and underscores",
			),
		).toBeInTheDocument();
	},
};

export const ReservedWord: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const usernameInput = canvas.getByLabelText("Username");

		// Enter a reserved word
		await userEvent.type(usernameInput, "admin");

		// Verify the error message
		expect(
			canvas.getByText("This username is not available"),
		).toBeInTheDocument();
	},
};

export const AlreadyExistingUsername: Story = {
	tags: ["validation"],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const usernameInput = canvas.getByLabelText("Username");

		// Input invalid username
		await userEvent.type(usernameInput, "already_exists_username");
		await userEvent.tab();

		// Wait for error message to appear
		const errorMessage = await canvas.findByText("Username already exists");

		await expect(errorMessage).toBeInTheDocument();
		await expect(mockCheckUsernameExists).toHaveBeenCalledWith(
			"already_exists_username",
		);
	},
};
