import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { useForm } from "react-hook-form";

import type { EmailSignupInput } from "../schemas/auth-schema";
import { PasswordField } from "./PasswordField";

type Story = StoryObj<typeof PasswordField<"signUp">>;

const meta = {
	title: "Features/Auth/Email/PasswordField",
	component: PasswordField<"signUp">,
	parameters: {
		layout: "centered",
		formType: "signUp",
	},
	decorators: [
		(Story, context) => {
			const { register } = useForm<EmailSignupInput>();
			const { register: _, ...restArgs } = context.args;
			return <Story args={{ register, ...restArgs }} />;
		},
	],

	tags: ["autodocs"],
} satisfies Meta<typeof PasswordField<"signUp">>;

export default meta;

export const Default: Story = {
	args: {
		disabled: false,
	},
};

export const WithError: Story = {
	args: {
		disabled: false,
		error: "Password must be at least 10 characters",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};

export const DisabledWithError: Story = {
	args: {
		disabled: true,
		error: "Password must be at least 10 characters",
	},
	parameters: {
		formType: "signUp",
	},
};

// 基本的な入力と表示/非表示のテスト
export const InputAndToggleVisibility: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const passwordInput = canvas.getByLabelText("Password");
		const toggleButton = canvas.getByRole("button", { name: "Show password" });

		// パスワードフィールドに入力できることを確認
		await userEvent.type(passwordInput, "MySecretPassword123");
		await expect(passwordInput).toHaveValue("MySecretPassword123");

		// 初期状態では入力が非表示(パスワードタイプ)であることを確認
		await expect(passwordInput).toHaveAttribute("type", "password");

		// 表示切り替えボタンをクリック
		await userEvent.click(toggleButton);

		// 入力が表示(テキストタイプ)になったことを確認
		await expect(passwordInput).toHaveAttribute("type", "text");

		// もう一度クリックで元に戻ることを確認
		await userEvent.click(toggleButton);
		await expect(passwordInput).toHaveAttribute("type", "password");
	},
};

// エラーメッセージの表示テスト
export const ErrorMessageDisplay: Story = {
	args: {
		error: "Password must be at least 10 characters",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// エラーメッセージが表示されていることを確認
		const errorMessage = canvas.getByText(
			"Password must be at least 10 characters",
		);
		await expect(errorMessage).toBeInTheDocument();
		await expect(errorMessage).toHaveAttribute("role", "alert");
	},
};

// 無効化状態のテスト
export const DisabledState: Story = {
	args: {
		disabled: true,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// パスワードフィールドを取得
		const passwordInput = canvas.getByLabelText("Password");

		// 無効化されていることを確認
		await expect(passwordInput).toBeDisabled();

		// 入力できないことを確認
		await userEvent.type(passwordInput, "test");
		await expect(passwordInput).toHaveValue("");
	},
};

// キーボード操作のテスト
export const KeyboardNavigation: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// パスワードフィールドにフォーカス
		const passwordInput = canvas.getByLabelText("Password");
		await userEvent.tab();

		// 最初のTabでパスワードフィールドにフォーカスされることを確認
		await expect(passwordInput).toHaveFocus();

		// 次のTabでトグルボタンにフォーカスされないことを確認（tabIndex=-1のため）
		await userEvent.tab();
		const toggleButton = canvas.getByRole("button", {
			name: "Show password",
		});
		await expect(toggleButton).not.toHaveFocus();
	},
};

// 長いパスワード入力のテスト
export const LongPasswordInput: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const passwordInput = canvas.getByLabelText("Password");
		// 100文字の長いパスワードを生成するのだ
		const veryLongPassword = "a".repeat(100);

		await userEvent.type(passwordInput, veryLongPassword);
		await expect(passwordInput).toHaveValue(veryLongPassword);
	},
};

// アイコン切り替えのテスト
export const IconToggle: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// トグルボタンを取得
		const toggleButton = canvas.getByRole("button", { name: /show password/i });

		// 初期状態では目のアイコンが表示されていることを確認
		expect(toggleButton.querySelector("svg")).toBeInTheDocument();

		// クリックしてアイコンが切り替わることを確認
		await userEvent.click(toggleButton);

		// 表示されているアイコンが変更されていることを確認
		const updatedToggleButton = canvas.getByRole("button", {
			name: /hide password/i,
		});
		expect(updatedToggleButton.querySelector("svg")).toBeInTheDocument();
	},
};
