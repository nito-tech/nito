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
	useFormField,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/utils/cn";

interface Props<T extends FieldValues> {
	name: Path<T>;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
}

export function OrganizationSlugField<T extends FieldValues>({
	name,
	label,
	placeholder,
	disabled = false,
	required = false,
}: Props<T>) {
	const t = useTranslations();
	const form = useFormContext<T>();

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => {
				const { error } = useFormField();

				return (
					<FormItem>
						<FormLabel htmlFor={name}>
							{label || t("Organization.slug")}
							{required && <span className="text-destructive">*</span>}
						</FormLabel>
						<div className="relative">
							<div
								className={cn(
									"flex group rounded-md border",
									error
										? "border-destructive ring-3 ring-destructive/0 focus-within:ring-destructive/25"
										: "focus-within:ring-3 focus-within:ring-offset-0 focus-within:ring-ring/50 focus-within:border-ring",
								)}
							>
								<div className="flex items-center px-3 bg-muted text-muted-foreground rounded-l-md border-r text-sm">
									nito.tech/
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
										autoCorrect="off"
										className={cn(
											"rounded-l-none",
											"border-0", // Remove internal input field borders
											"focus-visible:ring-0 focus-visible:ring-offset-0", // Remove internal focus ring
										)}
									/>
								</FormControl>
							</div>
						</div>
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
}
