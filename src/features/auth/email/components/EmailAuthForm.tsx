"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { Notice } from "@/components/Notice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { logInWithEmail, signUpWithEmail } from "../actions";
import {
	type EmailLoginInput,
	type EmailSignupInput,
	type TranslationFunction,
	createEmailLoginSchema,
	createEmailSignupSchema,
} from "../schemas/auth-schema";
import { EmailField } from "./EmailField";
import { PasswordField } from "./PasswordField";
import { UsernameField } from "./UsernameField";

interface FormProps {
	className?: string;
}

function SignUpForm({ className }: FormProps) {
	const t = useTranslations();
	const [messageType, setMessageType] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const methods = useForm<EmailSignupInput>({
		mode: "onChange",
		resolver: zodResolver(createEmailSignupSchema(t as TranslationFunction)),
	});

	const onSubmitHandler: SubmitHandler<EmailSignupInput> = async (data) => {
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
		<FormProvider {...methods}>
			<form
				noValidate
				aria-label="Sign up form"
				className={cn("grid gap-6", className)}
				onSubmit={methods.handleSubmit(onSubmitHandler)}
			>
				<div className="grid gap-6">
					{messageType === "success" && message && (
						<Notice variant="success" text={message} />
					)}
					{messageType === "error" && message && (
						<Notice variant="destructive" text={message} />
					)}
					<EmailField<"signUp"> disabled={methods.formState.isSubmitting} />
					<PasswordField<"signUp"> disabled={methods.formState.isSubmitting} />
					<UsernameField disabled={methods.formState.isSubmitting} />
				</div>
				<Button
					type="submit"
					className="mt-1"
					disabled={methods.formState.isSubmitting}
				>
					{t("Auth.signUp")}
				</Button>
			</form>
		</FormProvider>
	);
}

function LogInForm({ className }: FormProps) {
	const t = useTranslations();
	const router = useRouter();
	const [messageType, setMessageType] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const methods = useForm<EmailLoginInput>({
		mode: "onChange",
		resolver: zodResolver(createEmailLoginSchema(t as TranslationFunction)),
	});

	const onSubmitHandler: SubmitHandler<EmailLoginInput> = async (data) => {
		setMessageType(null);
		setMessage(null);

		try {
			await logInWithEmail(data);
			router.push("/dashboard");
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
		<FormProvider {...methods}>
			<form
				noValidate
				aria-label="Log in form"
				className={cn("grid gap-6", className)}
				onSubmit={methods.handleSubmit(onSubmitHandler)}
			>
				<div className="grid gap-6">
					{messageType === "error" && message && (
						<Notice variant="destructive" text={message} />
					)}
					<EmailField<"logIn"> disabled={methods.formState.isSubmitting} />
					<PasswordField<"logIn"> disabled={methods.formState.isSubmitting} />
				</div>
				<Button
					type="submit"
					className="mt-1"
					disabled={methods.formState.isSubmitting}
				>
					{t("Auth.logIn")}
				</Button>
			</form>
		</FormProvider>
	);
}

export type EmailAuthFormType = "signUp" | "logIn";

interface Props {
	type: EmailAuthFormType;
	className?: string;
}

export default function EmailAuthForm({ type, className }: Props) {
	return type === "signUp" ? (
		<SignUpForm className={className} />
	) : (
		<LogInForm className={className} />
	);
}
