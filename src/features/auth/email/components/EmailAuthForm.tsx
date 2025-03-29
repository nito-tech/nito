"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
	const t = useTranslations("Auth");
	const [messageType, setMessageType] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
		setError,
	} = useForm<EmailSignupInput>({
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
		<form
			noValidate
			aria-label="Sign up form"
			className={cn("grid gap-6", className)}
			onSubmit={handleSubmit(onSubmitHandler)}
		>
			<div className="grid gap-6">
				{messageType === "success" && message && (
					<Notice variant="success" text={message} />
				)}
				{messageType === "error" && message && (
					<Notice variant="destructive" text={message} />
				)}

				<EmailField<"signUp">
					disabled={isSubmitting}
					register={register}
					error={errors.email?.message}
				/>

				<PasswordField<"signUp">
					disabled={isSubmitting}
					register={register}
					error={errors.password?.message}
				/>

				<UsernameField
					disabled={isSubmitting}
					register={register}
					error={errors.username?.message}
					watch={watch}
					setError={setError}
				/>
			</div>
			<Button type="submit" className="mt-1" disabled={isSubmitting}>
				{t("signUp")}
			</Button>
		</form>
	);
}

function LogInForm({ className }: FormProps) {
	const t = useTranslations("Auth");
	const router = useRouter();
	const [messageType, setMessageType] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<EmailLoginInput>({
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
		<form
			noValidate
			aria-label="Log in form"
			className={cn("grid gap-6", className)}
			onSubmit={handleSubmit(onSubmitHandler)}
		>
			<div className="grid gap-6">
				{messageType === "error" && message && (
					<Notice variant="destructive" text={message} />
				)}

				<EmailField<"logIn">
					disabled={isSubmitting}
					register={register}
					error={errors.email?.message}
				/>

				<PasswordField<"logIn">
					disabled={isSubmitting}
					register={register}
					error={errors.password?.message}
				/>
			</div>
			<Button type="submit" className="mt-1" disabled={isSubmitting}>
				{t("logIn")}
			</Button>
		</form>
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
