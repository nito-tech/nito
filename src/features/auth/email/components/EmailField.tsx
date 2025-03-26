"use client";

import { useTranslations } from "next-intl";
import type { Path, UseFormRegister } from "react-hook-form";

import { FormError } from "@/components/form/FormError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { EmailLoginInput, EmailSignupInput } from "../types/email-auth";

type FormInput<T extends "signUp" | "logIn"> = T extends "signUp"
	? EmailSignupInput
	: EmailLoginInput;

interface Props<T extends "signUp" | "logIn"> {
	disabled?: boolean;
	error?: string;
	register: UseFormRegister<FormInput<T>>;
}

export function EmailField<T extends "signUp" | "logIn">({
	disabled,
	error,
	register,
}: Props<T>) {
	const t = useTranslations();

	return (
		<div className="grid gap-1">
			<Label htmlFor="email">{t("UserInfo.email")}</Label>
			<Input
				id="email"
				placeholder="name@example.com"
				type="email"
				disabled={disabled}
				{...register("email" as Path<FormInput<T>>)}
				autoCapitalize="none"
				autoComplete="email"
				autoCorrect="off"
			/>
			{error && <FormError message={error} />}
		</div>
	);
}
