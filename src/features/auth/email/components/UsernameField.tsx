"use client";

import { useTranslations } from "next-intl";
import type { UseFormRegister } from "react-hook-form";

import { FormError } from "@/components/form/FormError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { EmailSignupInput } from "../schemas/auth-schema";

interface Props {
	disabled: boolean;
	register: UseFormRegister<EmailSignupInput>;
	error?: string;
}

export function UsernameField({ disabled, register, error }: Props) {
	const t = useTranslations();

	return (
		<div className="grid gap-1">
			<div className="flex items-center gap-1">
				<Label htmlFor="username">{t("Auth.username")}</Label>
				<span className="text-xs text-muted-foreground">
					({t("Auth.usernameCanBeChanged")})
				</span>
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
