import type { Meta, StoryObj } from "@storybook/react";

import { OrganizationSelector } from "./organization-selector";

const meta = {
	title: "Features/Organizations/OrganizationSelector",
	component: OrganizationSelector,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof OrganizationSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
