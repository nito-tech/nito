"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Notice } from "@/components/feedback/Notice/Notice";
import { EmailField } from "@/components/form/EmailField/EmailField";
import { PasswordField } from "@/components/form/PasswordField/PasswordField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { queryKeys } from "@/lib/query-keys";
import { createBrowserClient } from "@/lib/supabase/client";
import { createEmailSchema, createPasswordSchema } from "@/types/schema";
import { cn } from "@/utils/cn";

import { logInWithEmail } from "../../actions";

interface Props {
	className?: string;
}

export function EmailLogInForm({ className }: Props) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [messageType, setMessageType] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const t = useTranslations();
	const schema = z.object({
		email: createEmailSchema(t),
		password: createPasswordSchema(t),
	});
	type FormValues = z.infer<typeof schema>;

	const onSubmitHandler: SubmitHandler<FormValues> = async (data) => {
		setMessageType(null);
		setMessage(null);

		try {
			const session = await logInWithEmail(data);

			// Since login is performed server-side, the onAuthStateChange in AuthProvider that executes client-side doesn't fire
			// As a result, user information doesn't appear in the sidebar
			// Therefore, by explicitly setting the session, we make user information display properly in the sidebar
			const supabase = createBrowserClient();
			await supabase.auth.setSession(session);

			// Invalidate the session query to force a refetch
			await queryClient.invalidateQueries({ queryKey: queryKeys.auth.session });

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
		<Form
			schema={schema}
			onSubmit={onSubmitHandler}
			noValidate
			aria-label="Log in form"
			className={cn("grid", className)}
		>
			{({ formState }) => (
				<>
					<div className="grid gap-6">
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
					</div>
					<Button
						type="submit"
						className="mt-1"
						disabled={formState.isSubmitting}
					>
						{t("Auth.logIn")}
					</Button>
				</>
			)}
		</Form>
	);
}
