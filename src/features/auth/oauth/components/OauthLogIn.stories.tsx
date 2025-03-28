import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";

// GitHubLoginButtonコンポーネントを直接インポートして使用する
import { GitHubLoginButton } from "./GitHubLoginButton";

const meta = {
	title: "Features/Auth/OauthLogIn",
	component: GitHubLoginButton,
	parameters: {
		layout: "centered",
	},
	args: {
		// デフォルトのpropsを設定
		label: "Continue with GitHub",
		onClick: fn(),
		isSubmitting: false,
	},
	tags: ["autodocs"],
} satisfies Meta<typeof GitHubLoginButton>;

export default meta;

type Story = StoryObj<typeof GitHubLoginButton>;

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
		await expect(button).toHaveTextContent("Continue with GitHub");
		await expect(button).toHaveClass("w-full");
		await expect(githubIcon).toBeInTheDocument();
		await expect(githubIcon).toHaveAttribute("width", "24");
		await expect(githubIcon).toHaveAttribute("height", "24");
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
 * Custom label for the GitHub login button
 */
export const CustomLabel: Story = {
	args: {
		label: "Sign in with GitHub",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button");

		await expect(button).toBeEnabled();
		await expect(button).toHaveTextContent("Sign in with GitHub");
		await expect(button).toHaveClass("w-full");
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
		await expect(button).toHaveTextContent("Continue with GitHub");
		await expect(button).toHaveClass("w-full");
		await expect(githubIcon).toBeInTheDocument();

		// Test button click
		await userEvent.click(button);
		// Note: In development environment, it should show a warning toast
		// but we can't test the toast in Storybook
		await expect(button).toBeEnabled();
	},
};
