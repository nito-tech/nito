"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useOrganizationStore } from "@/entities/organization/model/organization-store";
import { EmailField } from "@/entities/user/ui/email-field/email-field";
import { PasswordField } from "@/entities/user/ui/password-field/password-field";
import { Button } from "@/shared/ui/button";
import { Form } from "@/shared/ui/form";
import { Notice } from "@/shared/ui/notice/notice";
import { cn } from "@/shared/utils/cn";
import { useGetOrganizations } from "#features/organizations/model/useOrganization";

import { Loader2 } from "lucide-react";
import { LogInWithEmailSchema } from "../model/log-in-with-email-schemas";
import type { LogInWithEmailInput } from "../model/log-in-with-email-schemas";
import { useLogInWithEmail } from "../model/useLogInWithEmail";

interface Props {
	className?: string;
}

export function EmailLogInForm({ className }: Props) {
	const t = useTranslations();

	const [messageType, setMessageType] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// ----------------------------------------------
	// Log in with email
	// ----------------------------------------------
	const {
		data: session,
		mutate: logInWithEmail,
		isPending: isLogInPending,
	} = useLogInWithEmail();

	async function onSubmit(data: LogInWithEmailInput) {
		setMessageType(null);
		setMessage(null);

		logInWithEmail(
			{ data },
			{
				onSuccess: () => {
					setIsLoggedIn(true);
					refetchOrganizations();
				},
				// TODO: Add a Provider that globally sends out Messages for common handling.
				onError: (error) => {
					setMessageType("error");
					if (error instanceof Error) {
						setMessage(error.message);
					} else {
						setMessage("Failed to authenticate. Please try again.");
					}
				},
			},
		);
	}

	// ----------------------------------------------
	// Get organizations if login succeeds and save it to Store
	// ----------------------------------------------
	const {
		data: organizations,
		refetch: refetchOrganizations,
		isLoading: isOrganizationsLoading,
	} = useGetOrganizations({
		queryConfig: {
			enabled: isLoggedIn, // Run if login succeeds
		},
	});
	const { setCurrentOrganization } = useOrganizationStore();
	const router = useRouter();

	useEffect(() => {
		if (isLoggedIn && organizations && organizations.length > 0) {
			const organization = organizations[0];
			setCurrentOrganization(organization);
			console.log("organization", organization);
			router.push(`/dashboard/${organization.slug}`);
		}
	}, [organizations, setCurrentOrganization, router, isLoggedIn]);

	return (
		<Form
			schema={LogInWithEmailSchema(t)}
			onSubmit={onSubmit}
			noValidate
			aria-label="Log in form"
			className={cn("grid", className)}
		>
			{({ formState }) => {
				const disabled =
					formState.isSubmitting || isLogInPending || isOrganizationsLoading;

				return (
					<>
						<div className="grid gap-6">
							{messageType === "error" && message && (
								<Notice variant="destructive" text={message} />
							)}
							<EmailField<LogInWithEmailInput>
								name="email"
								disabled={disabled}
							/>
							<PasswordField<LogInWithEmailInput>
								name="password"
								disabled={disabled}
							/>
						</div>
						<Button type="submit" className="mt-1" disabled={disabled}>
							{disabled && <Loader2 className="animate-spin" />}
							{t("Auth.logIn")}
						</Button>
					</>
				);
			}}
		</Form>
	);
}
