import type { Meta, StoryObj } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";

import enMessages from "@/shared/i18n/messages/en.json";
import jaMessages from "@/shared/i18n/messages/ja.json";

import LoginPage from "./login-page";

const meta: Meta<typeof LoginPage> = {
	title: "Pages/Login",
	component: LoginPage,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story) => (
			<NextIntlClientProvider messages={enMessages} locale="en">
				<Story />
			</NextIntlClientProvider>
		),
	],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const English: Story = {};

export const Japanese: Story = {
	decorators: [
		(Story) => (
			<NextIntlClientProvider messages={jaMessages} locale="ja">
				<Story />
			</NextIntlClientProvider>
		),
	],
};
