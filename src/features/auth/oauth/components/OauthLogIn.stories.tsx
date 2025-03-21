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
 * OAuth login component with fixed width of 300px
 */
export const WithFixedWidth: Story = {
	args: {
		className: "w-[300px]",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const container = canvas.getByRole("button").parentElement;
		const button = canvas.getByRole("button");
		const githubIcon = canvas.getByRole("img", { name: "GitHub Icon" });

		// Test container width
		await expect(container).toHaveClass("w-[300px]");

		// Test button state and content
		await expect(button).toBeEnabled();
		await expect(button).toHaveTextContent("Log in with GitHub");
		await expect(button).toHaveClass("w-full");

		// Test GitHub icon
		await expect(githubIcon).toBeInTheDocument();
		await expect(githubIcon).toHaveClass("invert", "dark:invert-0");
	},
};

/**
 * OAuth login component with custom width and centered layout
 */
export const CenteredWithCustomWidth: Story = {
	args: {
		className: "max-w-md mx-auto",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const container = canvas.getByRole("button").parentElement;
		await expect(container).toHaveClass("max-w-md", "mx-auto");
		await expect(canvas.getByRole("button")).toHaveClass("w-full");
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

		// Test initial state
		await expect(button).toBeEnabled();
		await expect(button).toHaveTextContent("Log in with GitHub");
		await expect(button).toHaveClass("w-full");
		await expect(githubIcon).toBeInTheDocument();

		// Test button click
		await userEvent.click(button);
		// Note: In development environment, it should show a warning toast
		// but we can't test the toast in Storybook
		await expect(button).toBeEnabled();
	},
};
