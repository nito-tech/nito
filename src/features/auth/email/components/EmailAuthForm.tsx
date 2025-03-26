"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type {
	FieldErrors,
	Path,
	SubmitHandler,
	UseFormRegister,
} from "react-hook-form";

import { Notice } from "@/components/Notice";
import { FormError } from "@/components/form/FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { logInWithEmail, signUpWithEmail } from "../actions";
import {
	type EmailLoginInput,
	EmailLoginSchema,
	type EmailSignupInput,
	EmailSignupSchema,
} from "../types/email-auth";

interface Props {
	type: "signUp" | "logIn";
	className?: string;
}

type FormInput<T extends "signUp" | "logIn"> = T extends "signUp"
	? EmailSignupInput
	: EmailLoginInput;

interface BaseFormFieldProps<T extends "signUp" | "logIn"> {
	disabled?: boolean;
	error?: string;
	register: UseFormRegister<FormInput<T>>;
	type: T;
}

interface FormProps {
	className?: string;
}

function EmailField<T extends "signUp" | "logIn">({
	disabled,
	error,
	register,
	type,
}: BaseFormFieldProps<T>) {
	const t = useTranslations();

	return (
		<div className="grid gap-1">
			<Label htmlFor="email">{t("UserInfo.email")}</Label>
			<Input
				id="email"
				placeholder="name@example.com"
				type="email"
				disabled={disabled}
				{...register("email" as Path<FormInput<T>>)}
				autoCapitalize="none"
				autoComplete="email"
				autoCorrect="off"
			/>
			{error && <FormError message={error} />}
		</div>
	);
}

function PasswordField<T extends "signUp" | "logIn">({
	disabled,
	error,
	register,
	type,
}: BaseFormFieldProps<T>) {
	const t = useTranslations();
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="grid gap-1">
			<Label htmlFor="password">{t("UserInfo.password")}</Label>
			<div
				className={cn(
					"flex group rounded-md",
					"focus-within:ring-ring/50 focus-within:ring-[3px] focus-within:border-ring",
				)}
			>
				<Input
					id="password"
					placeholder="Password"
					type={showPassword ? "text" : "password"}
					disabled={disabled}
					{...register("password" as Path<FormInput<T>>)}
					autoComplete="current-password"
					className={cn(
						"rounded-r-none border",
						"focus-visible:ring-0 focus-visible:ring-offset-0",
					)}
				/>
				<Button
					type="button"
					size="icon"
					variant="outline"
					tabIndex={-1}
					aria-label={showPassword ? "Hide password" : "Show password"}
					onClick={() => setShowPassword(!showPassword)}
					className={cn(
						"h-9 rounded-l-none aspect-square border-l-0",
						"focus-visible:ring-0 focus-visible:border-0",
					)}
				>
					{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
				</Button>
			</div>
			{error && <FormError message={error} />}
		</div>
	);
}

interface UsernameFieldProps {
	disabled?: boolean;
	error?: string;
	register: UseFormRegister<EmailSignupInput>;
	helperText?: string;
}

function UsernameField({
	disabled,
	error,
	register,
	helperText,
}: UsernameFieldProps) {
	const t = useTranslations();

	return (
		<div className="grid gap-1">
			<div className="flex items-center gap-1">
				<Label htmlFor="username">{t("Auth.username")}</Label>
				{helperText && (
					<span className="text-xs text-muted-foreground">({helperText})</span>
				)}
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
			{error && <FormError message={error} />}
		</div>
	);
}

function SignUpForm({ className }: FormProps) {
	const t = useTranslations();
	const router = useRouter();
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

				<EmailField
					disabled={isSubmitting}
					error={errors.email?.message}
					register={register}
					type="signUp"
				/>

				<PasswordField
					disabled={isSubmitting}
					error={errors.password?.message}
					register={register}
					type="signUp"
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

				<EmailField
					disabled={isSubmitting}
					error={errors.email?.message}
					register={register}
					type="logIn"
				/>

				<PasswordField
					disabled={isSubmitting}
					error={errors.password?.message}
					register={register}
					type="logIn"
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
