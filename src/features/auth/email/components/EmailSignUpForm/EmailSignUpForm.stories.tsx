import type { Meta, StoryObj } from "@storybook/react";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { createEmailSchema } from "@/components/form/EmailField/EmailField";
import { createPasswordSchema } from "@/components/form/PasswordField/PasswordField";
import { createUsernameSchema } from "@/components/form/UsernameField/UsernameField";

import { Form } from "@/components/ui/form";
import { EmailSignUpForm } from "./EmailSignUpForm";

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
