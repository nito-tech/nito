"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { EmailField } from "@/entities/user/ui/email-field/email-field";
import { PasswordField } from "@/entities/user/ui/password-field/password-field";
import { Button } from "@/shared/ui/button";
import { Form } from "@/shared/ui/form";
import { cn } from "@/shared/utils/cn";

import { Notice } from "@/shared/ui/notice/notice";
import { LogInWithEmailSchema } from "../model/log-in-with-email-schemas";
import type { LogInWithEmailInput } from "../model/log-in-with-email-schemas";
import { useLogInWithEmail } from "../model/useLogInWithEmail";

interface Props {
	className?: string;
}

export function EmailLogInForm({ className }: Props) {
	const t = useTranslations();

	const [messageType, setMessageType] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const { mutate: logInWithEmail, isPending } = useLogInWithEmail();

	async function onSubmit(data: LogInWithEmailInput) {
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
			schema={LogInWithEmailSchema(t)}
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
						<EmailField<LogInWithEmailInput>
							name="email"
							disabled={formState.isSubmitting || isPending}
						/>
						<PasswordField<LogInWithEmailInput>
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
