import type { Meta, StoryObj } from "@storybook/react";
import { Notice } from "./Notice";

const meta = {
	title: "Components/Notice",
	component: Notice,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Notice>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default variant of the Notice component
 */
export const Default: Story = {
	args: {
		variant: "default",
		title: "Default Notice",
		text: "This is a default notice message.",
	},
	tags: ["code-only"],
};

/**
 * Info variant of the Notice component
 */
export const Info: Story = {
	args: {
		variant: "info",
		title: "Info Notice",
		text: "This is an info notice message.",
	},
	tags: ["code-only"],
};

/**
 * Success variant of the Notice component
 */
export const Success: Story = {
	args: {
		variant: "success",
		title: "Success Notice",
		text: "This is a success notice message.",
	},
	tags: ["code-only"],
};

/**
 * Destructive variant of the Notice component
 */
export const Destructive: Story = {
	args: {
		variant: "destructive",
		title: "Destructive Notice",
		text: "This is a destructive notice message.",
	},
	tags: ["code-only"],
};

/**
 * Notice component with long text
 */
export const LongText: Story = {
	args: {
		variant: "info",
		title: "Long Text Notice",
		text: "This is a notice with a very long text message. It should wrap properly and maintain proper spacing. The text should be readable and well-formatted even when it spans multiple lines.",
	},
	tags: ["code-only"],
};

/**
 * Notice component with text only
 */
export const TextOnly: Story = {
	args: {
		variant: "info",
		text: "This is a notice with text only.",
	},
	tags: ["code-only"],
};
