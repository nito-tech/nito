import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { useTranslations } from "next-intl";
import { FormProvider } from "react-hook-form";
import { z } from "zod";

import { createEmailSchema } from "@/components/form/EmailField/email-schema";
import { createPasswordSchema } from "@/components/form/PasswordField/password-schema";
import { createUsernameSchema } from "@/components/form/UsernameField/username-schema";
import { useFormWithOnChange } from "@/hooks/useFormWithOnChange";

import EmailAuthForm from "./EmailAuthForm";

const meta = {
	title: "Features/Auth/Email/EmailAuthForm",
	component: EmailAuthForm,
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
} satisfies Meta<typeof EmailAuthForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignUp: Story = {
	args: {
		type: "signUp",
	},
	tags: ["code-only"],
};

export const LogIn: Story = {
	args: {
		type: "logIn",
	},
	tags: ["code-only"],
};
