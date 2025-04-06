import type { Meta, StoryObj } from "@storybook/react";

import { OrganizationList } from "./organization-list";

const meta = {
	title: "Features/Organization/OrganizationList",
	component: OrganizationList,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof OrganizationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		userId: "00000000-0000-0000-0000-000000000001",
	},
};
