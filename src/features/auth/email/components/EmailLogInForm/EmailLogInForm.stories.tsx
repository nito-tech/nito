import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { useTranslations } from "next-intl";
import { FormProvider } from "react-hook-form";
import { z } from "zod";

import { createEmailSchema } from "@/components/form/EmailField/email-schema";
import { createPasswordSchema } from "@/components/form/PasswordField/password-schema";
import { createUsernameSchema } from "@/components/form/UsernameField/username-schema";
import { useFormWithOnChange } from "@/hooks/useFormWithOnChange";

import { EmailLogInForm } from "./EmailLogInForm";

const meta = {
	title: "Features/Auth/Email/EmailLogInForm",
	component: EmailLogInForm,
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
} satisfies Meta<typeof EmailLogInForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	tags: ["code-only"],
};
