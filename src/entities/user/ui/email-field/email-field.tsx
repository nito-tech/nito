"use client";

import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

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
