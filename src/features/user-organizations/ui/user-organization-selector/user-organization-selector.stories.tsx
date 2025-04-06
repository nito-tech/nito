import type { Meta, StoryObj } from "@storybook/react";

import { UserOrganizationSelector } from "./user-organization-selector";

const meta = {
	title: "Features/UserOrganizations/UserOrganizationSelector",
	component: UserOrganizationSelector,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof UserOrganizationSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
