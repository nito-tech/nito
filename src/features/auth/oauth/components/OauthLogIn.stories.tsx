import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { NextIntlClientProvider } from "next-intl";

import OauthLogIn from "./OauthLogIn";

const meta = {
	title: "Features/Auth/OauthLogIn",
	component: OauthLogIn,
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<NextIntlClientProvider
				locale="en"
				messages={{ Auth: { logInWithGithub: "Log in with GitHub" } }}
			>
				<Story />
			</NextIntlClientProvider>
		),
	],
	tags: ["autodocs"],
} satisfies Meta<typeof OauthLogIn>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default state of the OAuth login component
 */
export const Default: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button");
		const githubIcon = canvas.getByRole("img", { name: "GitHub Icon" });

		await expect(button).toBeEnabled();
		await expect(button).toHaveTextContent("Log in with GitHub");
		await expect(button).toHaveClass("w-full");
		await expect(githubIcon).toBeInTheDocument();
		await expect(githubIcon).toHaveAttribute("width", "24");
		await expect(githubIcon).toHaveAttribute("height", "24");
	},
};

/**
 * Interactive test of the OAuth login component
 */
export const Interactive: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button");
		const githubIcon = canvas.getByRole("img", { name: "GitHub Icon" });

		// Test button is enabled and has correct text and icon
		await expect(button).toBeEnabled();
		await expect(button).toHaveTextContent("Log in with GitHub");
		await expect(button).toHaveClass("w-full");
		await expect(githubIcon).toBeInTheDocument();

		// Test button click
		await userEvent.click(button);
		// Note: In development environment, it should show a warning toast
		await expect(button).toBeEnabled();
	},
};
