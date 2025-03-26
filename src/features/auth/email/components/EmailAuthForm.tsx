"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

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

export default function EmailAuthForm({ type, className }: Props) {
	const t = useTranslations();

	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);

	const [messageType, setMessageType] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<EmailSignupInput | EmailLoginInput>({
		mode: "onChange",
		resolver: zodResolver(
			type === "signUp" ? EmailSignupSchema : EmailLoginSchema,
		),
	});

	const onSubmitHandler: SubmitHandler<
		EmailSignupInput | EmailLoginInput
	> = async (data) => {
		setMessageType(null);
		setMessage(null);

		try {
			if (type === "signUp") {
				const formData = EmailSignupSchema.parse(data);
				await signUpWithEmail(formData);
				setMessageType("success");
				setMessage("Check your email to verify your account.");
			} else {
				const formData = EmailLoginSchema.parse(data);
				await logInWithEmail(formData);
				router.push("/dashboard");
			}
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

				<div className="grid gap-1">
					<Label htmlFor="email">{t("UserInfo.email")}</Label>
					<Input
						id="email"
						placeholder="name@example.com"
						type="email"
						disabled={isSubmitting}
						{...register("email")}
						autoCapitalize="none"
						autoComplete="email"
						autoCorrect="off"
					/>
					{errors.email && <FormError message={errors.email.message} />}
				</div>

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
							disabled={isSubmitting}
							{...register("password")}
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
					{errors.password && <FormError message={errors.password.message} />}
				</div>

				{type === "signUp" && (
					<div className="grid gap-1">
						<div className="flex items-center gap-1">
							<Label htmlFor="username">{t("Auth.username")}</Label>
							<span className="text-xs text-muted-foreground">
								({t("Auth.usernameCanBeChanged")})
							</span>
						</div>
						<Input
							id="username"
							placeholder="Username"
							disabled={isSubmitting}
							{...register("username")}
						/>
						{/* TODO: Add error message */}
					</div>
				)}
			</div>
			<Button type="submit" className="mt-1" disabled={isSubmitting}>
				{type === "signUp" ? t("Auth.signUp") : t("Auth.logIn")}
			</Button>
		</form>
	);
}
