"use client";

import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { type FieldValues, type Path, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	useFormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { PASSWORD_MAX_LENGTH } from "./password-schema";

interface Props<T extends FieldValues> {
	name: Path<T>;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	showCount?: boolean;
	autoComplete?: string;
}

export function PasswordField<T extends FieldValues>({
	name,
	label,
	placeholder = "Password",
	disabled = false,
	required = false,
	showCount = true,
	autoComplete = "current-password",
}: Props<T>) {
	const t = useTranslations("UserInfo");
	const form = useFormContext<T>();
	const [showPassword, setShowPassword] = useState(false);

	const passwordValue = form.watch(name) as unknown as string;

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => {
				const { error } = useFormField();

				return (
					<FormItem>
						<FormLabel htmlFor={name}>
							{label || t("password")}
							{required && <span className="text-destructive ml-1">*</span>}
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
								<FormControl>
									<Input
										{...field}
										value={field.value ?? ""}
										id={name}
										placeholder={placeholder}
										type={showPassword ? "text" : "password"}
										disabled={disabled}
										autoComplete={autoComplete}
										className={cn(
											"rounded-r-none",
											"border-0", // Remove internal input field borders
											"focus-visible:ring-0 focus-visible:ring-offset-0", // Remove internal focus ring
										)}
									/>
								</FormControl>
								<Button
									type="button"
									size="icon"
									variant="ghost"
									tabIndex={-1}
									aria-label={showPassword ? "Hide password" : "Show password"}
									onClick={() => setShowPassword(!showPassword)}
									className={cn(
										"h-9 rounded-l-none aspect-square",
										"border-l-1",
										"focus-visible:ring-0 focus-visible:border-0", // Remove focus ring
									)}
								>
									{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</Button>
							</div>
						</div>
						<div className="flex items-start justify-between">
							<FormMessage />
							{showCount && passwordValue && (
								<span className="text-xs text-muted-foreground shrink-0">
									{passwordValue.length} / {PASSWORD_MAX_LENGTH}
								</span>
							)}
						</div>
					</FormItem>
				);
			}}
		/>
	);
}
