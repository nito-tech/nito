import type { Meta, StoryObj } from "@storybook/react";

import { EmailSignUpForm } from "./email-signup-form";

const meta = {
	title: "Features/Auth/Email/EmailSignUpForm",
	component: EmailSignUpForm,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof EmailSignUpForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	tags: ["code-only"],
};
