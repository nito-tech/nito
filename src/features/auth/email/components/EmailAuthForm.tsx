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
	EmailLoginSchema,
	type EmailSignupInput,
	EmailSignupSchema,
} from "../types/email-auth";
import { EmailField } from "./EmailField";
import { PasswordField } from "./PasswordField";
import { UsernameField } from "./UsernameField";

export type EmailAuthFormType = "signUp" | "logIn";

interface Props {
	type: EmailAuthFormType;
	className?: string;
}

interface FormProps {
	className?: string;
}

function SignUpForm({ className }: FormProps) {
	const t = useTranslations();
	const [messageType, setMessageType] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<EmailSignupInput>({
		mode: "onChange",
		resolver: zodResolver(EmailSignupSchema),
	});

	const onSubmitHandler: SubmitHandler<EmailSignupInput> = async (data) => {
		setMessageType(null);
		setMessage(null);

		try {
			const formData = EmailSignupSchema.parse(data);
			await signUpWithEmail(formData);
			setMessageType("success");
			setMessage("Check your email to verify your account.");
		} catch (error) {
			setMessageType("error");
			setMessage("Failed to authenticate. Please try again.");
		}
	};

	return (
		<form
			noValidate
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
					error={errors.email?.message}
					register={register}
				/>

				<PasswordField<"signUp">
					disabled={isSubmitting}
					error={errors.password?.message}
					register={register}
				/>

				<UsernameField
					disabled={isSubmitting}
					error={errors.username?.message}
					register={register}
					helperText={t("Auth.usernameCanBeChanged")}
				/>
			</div>
			<Button type="submit" className="mt-1" disabled={isSubmitting}>
				{t("Auth.signUp")}
			</Button>
		</form>
	);
}

function LogInForm({ className }: FormProps) {
	const t = useTranslations();
	const router = useRouter();
	const [messageType, setMessageType] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<EmailLoginInput>({
		mode: "onChange",
		resolver: zodResolver(EmailLoginSchema),
	});

	const onSubmitHandler: SubmitHandler<EmailLoginInput> = async (data) => {
		setMessageType(null);
		setMessage(null);

		try {
			const formData = EmailLoginSchema.parse(data);
			await logInWithEmail(formData);
			router.push("/dashboard");
		} catch (error) {
			setMessageType("error");
			setMessage("Failed to authenticate. Please try again.");
		}
	};

	return (
		<form
			noValidate
			className={cn("grid gap-6", className)}
			onSubmit={handleSubmit(onSubmitHandler)}
		>
			<div className="grid gap-6">
				{messageType === "error" && message && (
					<Notice variant="destructive" text={message} />
				)}

				<EmailField<"logIn">
					disabled={isSubmitting}
					error={errors.email?.message}
					register={register}
				/>

				<PasswordField<"logIn">
					disabled={isSubmitting}
					error={errors.password?.message}
					register={register}
				/>
			</div>
			<Button type="submit" className="mt-1" disabled={isSubmitting}>
				{t("Auth.logIn")}
			</Button>
		</form>
	);
}

export default function EmailAuthForm({ type, className }: Props) {
	return type === "signUp" ? (
		<SignUpForm className={className} />
	) : (
		<LogInForm className={className} />
	);
}
