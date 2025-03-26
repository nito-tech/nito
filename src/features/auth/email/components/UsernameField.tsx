"use client";

import { useTranslations } from "next-intl";
import type { UseFormRegister } from "react-hook-form";

import { FormError } from "@/components/form/FormError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { EmailSignupInput } from "../types/email-auth";

interface Props {
	disabled?: boolean;
	error?: string;
	register: UseFormRegister<EmailSignupInput>;
	helperText?: string;
}

export function UsernameField({
	disabled,
	error,
	register,
	helperText,
}: Props) {
	const t = useTranslations();

	return (
		<div className="grid gap-1">
			<div className="flex items-center gap-1">
				<Label htmlFor="username">{t("Auth.username")}</Label>
				{helperText && (
					<span className="text-xs text-muted-foreground">({helperText})</span>
				)}
			</div>
			<Input
				id="username"
				placeholder="Username"
				type="text"
				disabled={disabled}
				{...register("username")}
				autoCapitalize="none"
				autoComplete="username"
				autoCorrect="off"
			/>
			{error && <FormError message={error} />}
		</div>
	);
}
