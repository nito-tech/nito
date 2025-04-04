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

export function OrganizationNameField<T extends FieldValues>({
	name,
	label,
	placeholder = "Organization Name",
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
						{label || t("Organization.name")}
						{required && <span className="text-destructive">*</span>}
					</FormLabel>
					<FormControl>
						<Input
							{...field}
							value={field.value ?? ""}
							id={name}
							type="text"
							placeholder={placeholder}
							disabled={disabled}
							autoCapitalize="none"
							autoComplete="organization"
							autoCorrect="off"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
