"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import * as v from "valibot";

import { Notice } from "@/components/Notice";
import { FormError } from "@/components/form/FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { signup } from "../action";
import {
	type EmailSignupInput,
	EmailSignupSchema,
} from "../types/email-signup";

interface Props {
	className?: string;
}

export default function EmailSignup({ className }: Props) {
	const [showPassword, setShowPassword] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<EmailSignupInput>({
		mode: "onBlur",
		resolver: valibotResolver(EmailSignupSchema),
	});

	const onSubmit: SubmitHandler<EmailSignupInput> = async (data) => {
		try {
			const formData = v.parse(EmailSignupSchema, data);
			await signup(formData);
			setMessage("Check your email to verify your account.");
		} catch (error) {
			console.error("Sign up error:", error);
			setMessage("There was an error signing up. Please try again.");
		}
	};

	return (
		<form
			noValidate
			className={cn("grid gap-6", className)}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="grid gap-6">
				{message && <Notice variant="success" text={message} />}

				<div className="grid gap-1">
					<Label htmlFor="email">Email</Label>
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
					<Label htmlFor="password">Password</Label>
					<div className="relative">
						<Input
							id="password"
							placeholder="Password"
							type={showPassword ? "text" : "password"}
							disabled={isSubmitting}
							{...register("password")}
							autoComplete="current-password"
						/>
						<button
							type="button"
							className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:cursor-pointer"
							onClick={() => setShowPassword(!showPassword)}
							tabIndex={-1}
							aria-label={showPassword ? "Hide password" : "Show password"}
						>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</button>
					</div>
					{errors.password && <FormError message={errors.password.message} />}
				</div>
			</div>
			<Button type="submit" className="mt-1" disabled={isSubmitting}>
				Signup
			</Button>
		</form>
	);
}
