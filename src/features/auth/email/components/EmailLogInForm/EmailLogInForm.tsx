"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Notice } from "@/components/feedback/Notice/Notice";
import { EmailField } from "@/components/form/EmailField/EmailField";
import { PasswordField } from "@/components/form/PasswordField/PasswordField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createEmailSchema, createPasswordSchema } from "@/types/schema";
import { cn } from "@/utils/cn";

import { useLogInWithEmail } from "../../../model/useLogInWithEmail";

interface Props {
	className?: string;
}

export function EmailLogInForm({ className }: Props) {
	const [messageType, setMessageType] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const t = useTranslations();
	const schema = z.object({
		email: createEmailSchema(t),
		password: createPasswordSchema(t),
	});
	type FormValues = z.infer<typeof schema>;

	const { mutate: logInWithEmail, isPending } = useLogInWithEmail();

	const onSubmitHandler: SubmitHandler<FormValues> = async (data) => {
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
	};

	return (
		<Form
			schema={schema}
			onSubmit={onSubmitHandler}
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
						<EmailField<FormValues>
							name="email"
							disabled={formState.isSubmitting || isPending}
						/>
						<PasswordField<FormValues>
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
