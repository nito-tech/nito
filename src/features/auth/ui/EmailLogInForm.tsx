"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { Notice } from "@/components/feedback/Notice/Notice";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { EmailField } from "@/shared/ui/EmailField/EmailField";
import { PasswordField } from "@/shared/ui/PasswordField/PasswordField";
import { cn } from "@/shared/utils/cn";

import { LogInWithEmailSchema } from "../model/schemas";
import type { LogInWithEmail } from "../model/types";
import { useLogInWithEmail } from "../model/useLogInWithEmail";

interface Props {
	className?: string;
}

export function EmailLogInForm({ className }: Props) {
	const t = useTranslations();

	const [messageType, setMessageType] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const { mutate: logInWithEmail, isPending } = useLogInWithEmail();

	async function onSubmit(data: LogInWithEmail) {
		setMessageType(null);
		setMessage(null);

		logInWithEmail(
			{ data },
			{
				// TODO: Add a Provider that globally sends out Messages for common handling.
				onError: (error) => {
					setMessageType("error");
					if (error instanceof Error) {
						setMessage(error.message);
					} else {
						setMessage("Failed to authenticate. Please try again.");
					}
				},
			},
		);
	}

	return (
		<Form
			schema={LogInWithEmailSchema(t as unknown as (key: string) => string)}
			onSubmit={onSubmit}
			noValidate
			aria-label="Log in form"
			className={cn("grid", className)}
		>
			{({ formState }) => (
				<>
					<div className="grid gap-6">
						{messageType === "error" && message && (
							<Notice variant="destructive" text={message} />
						)}
						<EmailField<LogInWithEmail>
							name="email"
							disabled={formState.isSubmitting || isPending}
						/>
						<PasswordField<LogInWithEmail>
							name="password"
							disabled={formState.isSubmitting || isPending}
						/>
					</div>
					<Button
						type="submit"
						className="mt-1"
						disabled={formState.isSubmitting || isPending}
					>
						{t("Auth.logIn")}
					</Button>
				</>
			)}
		</Form>
	);
}
