"use client";

import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { Path, UseFormRegister, UseFormWatch } from "react-hook-form";
import { z } from "zod";

import { FormError } from "@/components/form/FormError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { checkUsernameExists } from "../actions";
import { usernameSchema } from "../schemas/auth-schema";
import type { EmailSignupInput } from "../schemas/auth-schema";

interface Props {
	disabled: boolean;
	register: UseFormRegister<EmailSignupInput>;
	error?: string;
	watch: UseFormWatch<EmailSignupInput>;
	setError: (name: Path<EmailSignupInput>, error: { message: string }) => void;
}

export function UsernameField({
	disabled,
	register,
	error,
	watch,
	setError,
}: Props) {
	const t = useTranslations();
	const username = watch("username");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const checkUsername = async () => {
			if (!username) return;

			try {
				usernameSchema.parse(username);
				setIsLoading(true);

				await checkUsernameExists(username);
			} catch (error) {
				// If the error is a parse error, don't set the error
				if (error instanceof z.ZodError) return;

				if (error instanceof Error) {
					setError("username", {
						message: error.message,
					});
				}
			} finally {
				setIsLoading(false);
			}
		};

		// Debounce the check to avoid too many requests
		const timeoutId = setTimeout(checkUsername, 500);

		return () => clearTimeout(timeoutId);
	}, [username, setError]);

	return (
		<div className="grid gap-1">
			<div className="flex items-center gap-1">
				<Label htmlFor="username">{t("Auth.username")}</Label>
				<span className="text-xs text-muted-foreground">
					({t("Auth.usernameCanBeChanged")})
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
