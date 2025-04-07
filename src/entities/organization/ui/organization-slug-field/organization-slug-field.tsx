"use client";

import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";
import { z } from "zod";

import { OrganizationSlugSchema } from "@/entities/organization/model/organization-slug-schema";
import { useOrganizationSlug } from "@/entities/organization/model/useOrganizationSlug";
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

	const slug = form.watch(name);
	const { checkOrganizationSlugExists, isLoading } = useOrganizationSlug();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const validateSlug = async () => {
			if (!slug) return;

			try {
				OrganizationSlugSchema(t).parse(slug);
				await checkOrganizationSlugExists(slug);
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
		const timeoutId = setTimeout(validateSlug, 500);

		return () => clearTimeout(timeoutId);
		// We intentionally only depend on slug changes to prevent unnecessary re-renders
	}, [slug]);

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
									<div className="relative flex-1">
										<Input
											{...field}
											value={field.value ?? ""}
											id={name}
											type="text"
											placeholder={placeholder}
											disabled={disabled}
											autoCapitalize="none"
											autoCorrect="off"
											aria-invalid={!!error}
											className={cn(
												"rounded-l-none",
												"border-0", // Remove internal input field borders
												"focus-visible:ring-0 focus-visible:ring-offset-0", // Remove internal focus ring
											)}
										/>
									</div>
								</FormControl>
							</div>
						</div>
						{/* <FormMessage /> */}
						<div className="flex items-center gap-2">
							{isLoading && (
								<LoaderCircle className="h-4 w-4 animate-spin text-muted-foreground" />
							)}
							<FormMessage />
						</div>
					</FormItem>
				);
			}}
		/>
	);
}
