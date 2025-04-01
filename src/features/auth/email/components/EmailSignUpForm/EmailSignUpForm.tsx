"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Notice } from "@/components/feedback/Notice/Notice";
import {
	EmailField,
	createEmailSchema,
} from "@/components/form/EmailField/EmailField";
import {
	PasswordField,
	createPasswordSchema,
} from "@/components/form/PasswordField/PasswordField";
import { UsernameField } from "@/components/form/UsernameField/UsernameField";
import { createUsernameSchema } from "@/components/form/UsernameField/UsernameField";
import { Button } from "@/components/ui/button";
import { useFormWithOnChange } from "@/hooks/useFormWithOnChange";
import { cn } from "@/utils/cn";

import { signUpWithEmail } from "../../actions";

interface Props {
	className?: string;
}

export function EmailSignUpForm({ className }: Props) {
	const t = useTranslations();
	const [messageType, setMessageType] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const schema = z.object({
		email: createEmailSchema(t),
		password: createPasswordSchema(t),
		username: createUsernameSchema(t),
	});
	type FormValues = z.infer<typeof schema>;

	const form = useFormWithOnChange<FormValues>({
		resolver: zodResolver(schema),
	});

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
		<FormProvider {...form}>
			<form
				noValidate
				aria-label="Sign up form"
				className={cn("grid gap-6", className)}
				onSubmit={form.handleSubmit(onSubmitHandler)}
			>
				<div className="grid gap-6">
					{messageType === "success" && message && (
						<Notice variant="success" text={message} />
					)}
					{messageType === "error" && message && (
						<Notice variant="destructive" text={message} />
					)}

					<EmailField<FormValues>
						name="email"
						disabled={form.formState.isSubmitting}
					/>
					<PasswordField<FormValues>
						name="password"
						disabled={form.formState.isSubmitting}
					/>
					<UsernameField<FormValues>
						name="username"
						disabled={form.formState.isSubmitting}
					/>
				</div>
				<Button
					type="submit"
					className="mt-1"
					disabled={form.formState.isSubmitting}
				>
					{t("Auth.signUp")}
				</Button>
			</form>
		</FormProvider>
	);
}
