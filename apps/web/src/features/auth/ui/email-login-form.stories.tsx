import type { Meta, StoryObj } from "@storybook/react";

import { EmailLogInForm } from "./email-login-form";

const meta = {
	title: "Features/Auth/Email/EmailLogInForm",
	component: EmailLogInForm,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof EmailLogInForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	tags: ["code-only"],
};
