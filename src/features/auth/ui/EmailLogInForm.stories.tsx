import type { Meta, StoryObj } from "@storybook/react";
import { useTranslations } from "next-intl";

import { Form } from "@/components/ui/form";

import { LogInWithEmailSchema } from "../model/schema";
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
			const schema = LogInWithEmailSchema(
				t as unknown as (key: string) => string,
			);

			return (
				<Form schema={schema} onSubmit={() => {}}>
					{() => <Story />}
				</Form>
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
