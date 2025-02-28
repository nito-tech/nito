"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import * as v from "valibot";

import { FormError } from "@/components/FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const schema = v.object({
	email: v.pipe(
		v.string("Your email must be a string."),
		v.nonEmpty("Please enter your email."),
		v.email("The email address is badly formatted."),
	),
	password: v.pipe(
		v.string("Your password must be a string."),
		v.nonEmpty("Please enter your password."),
		v.minLength(8, "Your password must have 8 characters or more."),
	),
});

type LoginData = v.InferOutput<typeof schema>;

interface Props {
	className?: string;
}

export default function EmailSignup({ className }: Props) {
	const onSubmit: SubmitHandler<LoginData> = (data) => {
		const loginData = v.parse(schema, data);
		console.log(loginData);
	};

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginData>({
		mode: "onBlur",
		resolver: valibotResolver(schema),
	});

	return (
		<form
			noValidate
			className={cn("grid gap-6", className)}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="grid gap-6">
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
					<Input
						id="password"
						placeholder="Password"
						type="password"
						disabled={isSubmitting}
						{...register("password")}
						autoComplete="current-password"
					/>
					{errors.password && <FormError message={errors.password.message} />}
				</div>
			</div>
			<Button type="submit" className="mt-1" disabled={isSubmitting}>
				Signup
			</Button>
		</form>
	);
}
