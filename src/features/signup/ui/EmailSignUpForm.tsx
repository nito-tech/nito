"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
	createEmailSchema,
	createPasswordSchema,
	createUsernameSchema,
} from "@/shared/model/schemas";
import { EmailField } from "@/shared/ui/EmailField/EmailField";
import { Notice } from "@/shared/ui/Notice/Notice";
import { PasswordField } from "@/shared/ui/PasswordField/PasswordField";
import { UsernameField } from "@/shared/ui/UsernameField/UsernameField";
import { cn } from "@/shared/utils/cn";

import { useSignUpWithEmail } from "../model/useSignUpWithEmail";

interface Props {
	className?: string;
}

export function EmailSignUpForm({ className }: Props) {
	const [messageType, setMessageType] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const t = useTranslations();
	const schema = z.object({
		email: createEmailSchema(t),
		password: createPasswordSchema(t),
		username: createUsernameSchema(t),
	});
	type FormValues = z.infer<typeof schema>;

	const { mutate: signUpWithEmail, isPending } = useSignUpWithEmail();

	const onSubmitHandler: SubmitHandler<FormValues> = async (data) => {
		setMessageType(null);
		setMessage(null);

		signUpWithEmail(data, {
			onSuccess: () => {
				setMessageType("success");
				setMessage("Check your email to verify your account.");
			},
			onError: (error) => {
				setMessageType("error");
				if (error instanceof Error) {
					setMessage(error.message);
				} else {
					setMessage("Failed to authenticate. Please try again.");
				}
			},
		});
	};

	return (
		<Form
			schema={schema}
			onSubmit={onSubmitHandler}
			noValidate
			aria-label="Sign up form"
			className={cn("grid", className)}
		>
			{({ formState }) => (
				<>
					<div className="grid gap-6">
						{messageType === "success" && message && (
							<Notice variant="success" text={message} />
						)}
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
						<UsernameField<FormValues>
							name="username"
							disabled={formState.isSubmitting || isPending}
						/>
					</div>
					<Button
						type="submit"
						className="mt-1"
						disabled={formState.isSubmitting || isPending}
					>
						{t("Auth.signUp")}
					</Button>
				</>
			)}
		</Form>
	);
}
