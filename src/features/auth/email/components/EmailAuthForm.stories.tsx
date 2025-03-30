import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";

import { createEmailSignupSchema } from "../schemas/auth-schema";
import type {
	EmailSignupInput,
	TranslationFunction,
} from "../schemas/auth-schema";
import EmailAuthForm from "./EmailAuthForm";

const meta = {
	title: "Features/Auth/Email/EmailAuthForm",
	component: EmailAuthForm,
	parameters: {
		layout: "centered",
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
			context.parameters.methods = methods;

			return (
				<FormProvider {...methods}>
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
