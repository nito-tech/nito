"use client";

import { useTranslations } from "next-intl";
import type { Path, UseFormRegister } from "react-hook-form";

import { FormError } from "@/components/form/FormError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { EmailLoginInput, EmailSignupInput } from "../schemas/auth-schema";
import type { EmailAuthFormType } from "./EmailAuthForm";

type FormInput<T extends EmailAuthFormType> = T extends "signUp"
	? EmailSignupInput
	: EmailLoginInput;

interface Props<T extends EmailAuthFormType> {
	disabled: boolean;
	register: UseFormRegister<FormInput<T>>;
	error?: string;
}

export function EmailField<T extends EmailAuthFormType>({
	disabled,
	register,
	error,
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
