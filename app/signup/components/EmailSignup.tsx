"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Props {
	className?: string;
}

export default function EmailSignup({ className }: Props) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setIsSubmitting(true);
		// TODO: Handle form submission
		setIsSubmitting(false);
	};

	return (
		<form
			noValidate={true}
			className={cn("grid gap-6", className)}
			onSubmit={(e) => handleSubmit(e)}
		>
			<div className="grid gap-6">
				<div className="grid gap-1">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						placeholder="name@example.com"
						type="email"
						name="email"
						autoCapitalize="none"
						autoComplete="email"
						autoCorrect="off"
						className="w-full p-3 rounded-md bg-zinc-800"
					/>
				</div>

				<div className="grid gap-1">
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						placeholder="Password"
						type="password"
						name="password"
						autoComplete="current-password"
						className="w-full rounded-md bg-zinc-800"
					/>
				</div>
			</div>
			<Button type="submit" className="mt-1">
				Signup
			</Button>
		</form>
	);
}
