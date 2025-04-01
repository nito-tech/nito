"use client";

import { useTranslations } from "next-intl";
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

// MARK: - Schema

export type EmailTranslationFunction = (
	key:
		| "Auth.validation.emailRequired"
		| "Auth.validation.emailInvalid"
		| "Auth.validation.emailMinLength",
) => string;

export const createEmailSchema = (t: EmailTranslationFunction) => {
	return z
		.string({ required_error: t("Auth.validation.emailInvalid") })
		.min(1, { message: t("Auth.validation.emailMinLength") })
		.email({ message: t("Auth.validation.emailInvalid") });
};

export type EmailSchema = z.infer<ReturnType<typeof createEmailSchema>>;

// MARK: - Component

interface Props<T extends FieldValues> {
	name: Path<T>;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
}

// For security reasons, we don't check if an email already exists
// to prevent user enumeration attacks. The actual error will be handled after submission.

export function EmailField<T extends FieldValues>({
	name,
	label,
	placeholder = "name@example.com",
	disabled = false,
	required = false,
}: Props<T>) {
	const t = useTranslations();
	const form = useFormContext<T>();

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel htmlFor={name}>
						{label || t("UserInfo.email")}
						{required && <span className="text-destructive">*</span>}
					</FormLabel>
					<FormControl>
						<Input
							{...field}
							value={field.value ?? ""}
							id={name}
							type="email"
							placeholder={placeholder}
							disabled={disabled}
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
