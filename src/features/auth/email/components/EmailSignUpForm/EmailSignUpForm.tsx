"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Notice } from "@/components/feedback/Notice/Notice";
import { EmailField } from "@/components/form/EmailField/EmailField";
import { PasswordField } from "@/components/form/PasswordField/PasswordField";
import { UsernameField } from "@/components/form/UsernameField/UsernameField";
import { createUsernameSchema } from "@/components/form/UsernameField/UsernameField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createEmailSchema, createPasswordSchema } from "@/types/schema";
import { cn } from "@/utils/cn";

import { signUpWithEmail } from "../../actions";

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

	const onSubmitHandler: SubmitHandler<FormValues> = async (data) => {
		setMessageType(null);
		setMessage(null);

		try {
			await signUpWithEmail(data);
			setMessageType("success");
			setMessage("Check your email to verify your account.");
		} catch (error) {
			setMessageType("error");
			if (error instanceof Error) {
				setMessage(error.message);
			} else {
				setMessage("Failed to authenticate. Please try again.");
			}
		}
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
							disabled={formState.isSubmitting}
						/>
						<PasswordField<FormValues>
							name="password"
							disabled={formState.isSubmitting}
						/>
						<UsernameField<FormValues>
							name="username"
							disabled={formState.isSubmitting}
						/>
					</div>
					<Button
						type="submit"
						className="mt-1"
						disabled={formState.isSubmitting}
					>
						{t("Auth.signUp")}
					</Button>
				</>
			)}
		</Form>
	);
}
