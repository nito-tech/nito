"use client";

import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import { FormError } from "@/components/form/FormError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useUsername } from "../hooks/useUsername";
import { usernameSchema } from "../schemas/auth-schema";
import type {
	EmailSignupInput,
	TranslationFunction,
} from "../schemas/auth-schema";

interface Props {
	disabled: boolean;
}

export function UsernameField({ disabled }: Props) {
	const t = useTranslations("Auth");
	const {
		register,
		watch,
		setError,
		formState: { errors },
	} = useFormContext<EmailSignupInput>();
	const username = watch("username");
	const error = errors.username?.message?.toString();

	const { checkUsernameExists, isLoading } = useUsername();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const validateUsername = async () => {
			if (!username) return;

			try {
				usernameSchema(t as TranslationFunction).parse(username);
				await checkUsernameExists(username);
			} catch (error) {
				// If the error is a parse error, don't set the error
				if (error instanceof z.ZodError) return;

				if (error instanceof Error) {
					setError("username", {
						message: error.message,
					});
				}
			}
		};

		// Debounce the check to avoid too many requests
		const timeoutId = setTimeout(validateUsername, 500);

		return () => clearTimeout(timeoutId);
		// We intentionally only depend on username changes to prevent unnecessary re-renders
	}, [username]);

	return (
		<div className="grid gap-1">
			<div className="flex items-center gap-1">
				<Label htmlFor="username">{t("username")}</Label>
				<span className="text-xs text-muted-foreground">
					({t("usernameCanBeChanged")})
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
			<div className="flex items-center gap-2">
				{isLoading && (
					<LoaderCircle className="h-4 w-4 animate-spin text-muted-foreground" />
				)}
				{error && <FormError message={error} />}
			</div>
		</div>
	);
}
