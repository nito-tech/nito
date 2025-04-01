"use client";

import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";
import { z } from "zod";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/contexts/ProfileContext";
import { useUsername } from "@/features/auth/email/hooks/useUsername";

// MARK: - Schema

export type UsernameTranslationFunction = (
	key:
		| "Auth.validation.usernameRequired"
		| "Auth.validation.usernameMinLength"
		| "Auth.validation.usernameMaxLength"
		| "Auth.validation.usernameInvalidChars"
		| "Auth.validation.usernameReserved",
	// | "Auth.validation.usernameAlreadyExists",
) => string;

export const USERNAME_MAX_LENGTH = 50;

export const createUsernameSchema = (t: UsernameTranslationFunction) => {
	return z
		.string({ required_error: t("Auth.validation.usernameRequired") })
		.min(1, { message: t("Auth.validation.usernameMinLength") })
		.max(USERNAME_MAX_LENGTH, {
			message: t("Auth.validation.usernameMaxLength"),
		})
		.transform((val) => val.toLowerCase())
		.superRefine((val, ctx) => {
			if (val.length === 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: t("Auth.validation.usernameRequired"),
				});
				return;
			}

			if (!/^[a-z0-9_][a-z0-9_]*$/.test(val)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: t("Auth.validation.usernameInvalidChars"),
				});
				return;
			}

			if (
				/^(admin|root|system|user|test|guest|anonymous|null|undefined|true|false)$/.test(
					val,
				)
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: t("Auth.validation.usernameReserved"),
				});
				return;
			}
		});
};

export type UsernameSchemaType = z.infer<
	ReturnType<typeof createUsernameSchema>
>;

// MARK: - Component

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
