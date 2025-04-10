import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/shared/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import { OrganizationSelector } from "./organization-selector";

const meta = {
	title: "Features/Organizations/OrganizationSelector",
	component: OrganizationSelector,
	decorators: [
		(Story) => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline">Select Organization</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<Story />
				</DropdownMenuContent>
			</DropdownMenu>
		),
	],
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof OrganizationSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// モックデータがある場合のストーリー
export const WithOrganizations: Story = {
	parameters: {
		msw: {
			handlers: [
				// MSWのハンドラーを定義（必要な場合）
			],
		},
	},
};
