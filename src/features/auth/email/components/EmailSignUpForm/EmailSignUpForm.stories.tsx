import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { useTranslations } from "next-intl";
import { FormProvider } from "react-hook-form";
import { z } from "zod";

import { createEmailSchema } from "@/components/form/EmailField/EmailField";
import { createPasswordSchema } from "@/components/form/PasswordField/PasswordField";
import { createUsernameSchema } from "@/components/form/UsernameField/UsernameField";
import { useFormWithOnChange } from "@/hooks/useFormWithOnChange";

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
			type FormValues = z.infer<typeof schema>;

			const form = useFormWithOnChange<FormValues>({
				resolver: zodResolver(schema),
			});

			return (
				<FormProvider {...form}>
					<Story />
				</FormProvider>
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
