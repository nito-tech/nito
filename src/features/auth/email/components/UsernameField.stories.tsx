import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";

import { mockCheckUsernameExists } from "#features/auth/email/hooks/useUsername.mock";

import { createEmailSignupSchema } from "../schemas/auth-schema";
import type {
	EmailSignupInput,
	TranslationFunction,
} from "../schemas/auth-schema";
import { UsernameField } from "./UsernameField";

const meta = {
	title: "Features/Auth/Email/UsernameField",
	component: UsernameField,
	parameters: {
		layout: "centered",
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

export const ExistingUsername: Story = {
	parameters: {
		docs: {
			disable: true,
		},
	},
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

export const WithValidUsername: Story = {
	parameters: {
		docs: {
			disable: true,
		},
	},
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
