"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Notice } from "@/components/feedback/Notice/Notice";
import { EmailField } from "@/components/form/EmailField/EmailField";
import { createEmailSchema } from "@/components/form/EmailField/email-schema";
import { PasswordField } from "@/components/form/PasswordField/PasswordField";
import { createPasswordSchema } from "@/components/form/PasswordField/password-schema";
import { Button } from "@/components/ui/button";
import { useFormWithOnChange } from "@/hooks/useFormWithOnChange";
import { queryKeys } from "@/lib/query-keys";
import { createBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/utils/cn";

import { logInWithEmail } from "../../actions";

interface Props {
	className?: string;
}

export function EmailLogInForm({ className }: Props) {
	const t = useTranslations();
	const router = useRouter();
	const queryClient = useQueryClient();
	const [messageType, setMessageType] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const schema = z.object({
		email: createEmailSchema(t),
		password: createPasswordSchema(t),
	});
	type FormValues = z.infer<typeof schema>;

	const form = useFormWithOnChange<FormValues>({
		resolver: zodResolver(schema),
	});

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
		<FormProvider {...form}>
			<form
				noValidate
				aria-label="Log in form"
				className={cn("grid gap-6", className)}
				onSubmit={form.handleSubmit(onSubmitHandler)}
			>
				<div className="grid gap-6">
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
				</div>
				<Button
					type="submit"
					className="mt-1"
					disabled={form.formState.isSubmitting}
				>
					{t("Auth.logIn")}
				</Button>
			</form>
		</FormProvider>
	);
}
