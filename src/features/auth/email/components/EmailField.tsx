"use client";

import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import type { Path } from "react-hook-form";

import { FormError } from "@/components/form/FormError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { EmailLoginInput, EmailSignupInput } from "../schemas/auth-schema";
import type { EmailAuthFormType } from "./EmailAuthForm";

type FormInput<T extends EmailAuthFormType> = T extends "signUp"
	? EmailSignupInput
	: EmailLoginInput;

interface Props {
	disabled: boolean;
}

export function EmailField<T extends EmailAuthFormType>({ disabled }: Props) {
	const t = useTranslations("UserInfo");
	const {
		register,
		formState: { errors },
	} = useFormContext<FormInput<T>>();
	const error = errors.email?.message?.toString();

	// For security reasons, we don't check if an email already exists
	// to prevent user enumeration attacks. The actual error will be handled after submission.

	return (
		<div className="grid gap-1">
			<Label htmlFor="email">{t("email")}</Label>
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
