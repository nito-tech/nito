"use client";

import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { Path, UseFormRegister } from "react-hook-form";

import { FormError } from "@/components/form/FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import type { EmailLoginInput, EmailSignupInput } from "../types/email-auth";
import type { EmailAuthFormType } from "./EmailAuthForm";

type FormInput<T extends EmailAuthFormType> = T extends "signUp"
	? EmailSignupInput
	: EmailLoginInput;

interface Props<T extends EmailAuthFormType> {
	disabled: boolean;
	register: UseFormRegister<FormInput<T>>;
	error?: string;
}

export function PasswordField<T extends EmailAuthFormType>({
	disabled,
	register,
	error,
}: Props<T>) {
	const t = useTranslations();
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="grid gap-1">
			<Label htmlFor="password">{t("UserInfo.password")}</Label>
			<div
				className={cn(
					"flex group rounded-md",
					"focus-within:ring-ring/50 focus-within:ring-[3px] focus-within:border-ring",
				)}
			>
				<Input
					id="password"
					placeholder="Password"
					type={showPassword ? "text" : "password"}
					disabled={disabled}
					{...register("password" as Path<FormInput<T>>)}
					autoComplete="current-password"
					className={cn(
						"rounded-r-none border",
						"focus-visible:ring-0 focus-visible:ring-offset-0",
					)}
				/>
				<Button
					type="button"
					size="icon"
					variant="outline"
					tabIndex={-1}
					aria-label={showPassword ? "Hide password" : "Show password"}
					onClick={() => setShowPassword(!showPassword)}
					className={cn(
						"h-9 rounded-l-none aspect-square border-l-0",
						"focus-visible:ring-0 focus-visible:border-0",
					)}
				>
					{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
				</Button>
			</div>
			{error && <FormError message={error} />}
		</div>
	);
}
