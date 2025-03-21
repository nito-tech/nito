import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import { GitHubLoginButton } from "./GitHubLoginButton";

const meta = {
	title: "Features/Auth/GitHubLoginButton",
	component: GitHubLoginButton,
	parameters: {
		layout: "centered",
	},
	args: {
		label: "Log in with GitHub",
		onClick: () => {
			console.log("GitHub login button clicked");
		},
		isSubmitting: false,
	},
	tags: ["autodocs"],
} satisfies Meta<typeof GitHubLoginButton>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default state of the GitHub login button
 */
export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button");
		const githubIcon = canvas.getByRole("img", { name: "GitHub Icon" });

		// Test button state and content
		await expect(button).toBeEnabled();
		await expect(button).toHaveTextContent("Log in with GitHub");
		await expect(button).toHaveClass("w-full");

		// Test GitHub icon
		await expect(githubIcon).toBeInTheDocument();
		await expect(githubIcon).toHaveAttribute("width", "24");
		await expect(githubIcon).toHaveAttribute("height", "24");
		await expect(githubIcon).toHaveClass("invert", "dark:invert-0");
	},
};

/**
 * Loading state of the GitHub login button
 */
export const Loading: Story = {
	args: {
		isSubmitting: true,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button");
		const githubIcon = canvas.getByRole("img", { name: "GitHub Icon" });

		// Test button state
		await expect(button).toBeDisabled();
		await expect(button).toHaveClass("w-full");

		// Test GitHub icon
		await expect(githubIcon).toBeInTheDocument();
		await expect(githubIcon).toHaveClass("invert", "dark:invert-0");

		// Test loader
		const loader = canvas.getByLabelText("Loading icon");
		await expect(loader).toBeInTheDocument();
		await expect(loader).toHaveClass("animate-spin");
	},
};

/**
 * Interactive test of the GitHub login button
 */
export const Interactive: Story = {
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
		await expect(button).toBeEnabled();
	},
};
