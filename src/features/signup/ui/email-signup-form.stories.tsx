import type { Meta, StoryObj } from "@storybook/react";
import { useTranslations } from "next-intl";
import { z } from "zod";

import {
	createEmailSchema,
	createPasswordSchema,
	createUsernameSchema,
} from "@/shared/model/schemas";
import { Form } from "@/shared/ui/form";

import { EmailSignUpForm } from "./email-signup-form";

const meta = {
	title: "Features/Auth/Email/EmailSignUpForm",
	component: EmailSignUpForm,
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => {
			const t = useTranslations();
			const schema = z.object({
				email: createEmailSchema(t),
				password: createPasswordSchema(t),
				username: createUsernameSchema(t),
			});

			return (
				<Form schema={schema} onSubmit={() => {}}>
					{() => <Story />}
				</Form>
			);
		},
	],
	tags: ["autodocs"],
} satisfies Meta<typeof EmailSignUpForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	tags: ["code-only"],
};
