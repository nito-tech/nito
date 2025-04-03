"use client";

import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";
import { z } from "zod";

import { useProfile } from "@/shared/contexts/ProfileContext";
import { createUsernameSchema } from "@/shared/model/schemas";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useUsername } from "#entities/user/model/useUsername";

interface Props<T extends FieldValues> {
	name: Path<T>;
	label?: string;
	placeholder?: string;
	description?: string;
	disabled?: boolean;
	required?: boolean;
}

export function UsernameField<T extends FieldValues>({
	name,
	label,
	placeholder = "username",
	description,
	disabled = false,
	required = false,
}: Props<T>) {
	const t = useTranslations();
	const form = useFormContext<T>();
	const { profile } = useProfile();

	const username = form.watch(name);
	const { checkUsernameExists, isLoading } = useUsername();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const validateUsername = async () => {
			if (!username) return;

			try {
				createUsernameSchema(t).parse(username);

				// Skip username existence check if the username matches the current user's username
				// This is valid when updating Username in /dashboard/account/me
				if (username.toLowerCase() !== profile?.username?.toLowerCase()) {
					await checkUsernameExists(username);
				}

				form.clearErrors(name);
			} catch (error) {
				// If the error is a parse error, don't set the error
				if (error instanceof z.ZodError) return;

				if (error instanceof Error) {
					form.setError(name, {
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
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<div className="flex items-center gap-1">
						<FormLabel htmlFor={name}>
							{label || t("UserInfo.username")}
							{required && <span className="text-destructive">*</span>}
						</FormLabel>
						{description && (
							<span className="text-xs text-muted-foreground">
								({description})
							</span>
						)}
					</div>
					<FormControl>
						<Input
							{...field}
							value={field.value ?? ""}
							id={name}
							type="text"
							placeholder={placeholder}
							disabled={disabled}
							autoCapitalize="none"
							autoComplete="username"
							autoCorrect="off"
						/>
					</FormControl>
					<div className="flex items-center gap-2">
						{isLoading && (
							<LoaderCircle className="h-4 w-4 animate-spin text-muted-foreground" />
						)}
						<FormMessage />
					</div>
				</FormItem>
			)}
		/>
	);
}
