"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { EmailField } from "@/entities/user/ui/email-field/email-field";
import { UsernameField } from "@/entities/user/ui/username-field/username-field";
import { DangerZone } from "@/features/account/components/DangerZone/DangerZone";
import { useAuth } from "@/shared/contexts/AuthContext";
import { useProfile } from "@/shared/contexts/ProfileContext";
import { useFormWithOnChange } from "@/shared/lib/useFormWithOnChange";
import {
	createEmailSchema,
	createUsernameSchema,
} from "@/shared/model/schemas";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Form } from "@/shared/ui/form";
import { PageTitle } from "@/shared/ui/page-title/page-title";
import { cn } from "@/shared/utils/cn";

export default function AccountPage() {
	const t = useTranslations();
	const { user } = useAuth();
	const { profile, updateProfile } = useProfile();

	// ----------------------------------------------
	// Form
	// ----------------------------------------------
	const schema = z.object({
		email: createEmailSchema(t),
		username: createUsernameSchema(t),
	});
	type FormValues = z.infer<typeof schema>;

	const form = useFormWithOnChange<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			username: profile?.username ?? "",
			email: user?.email ?? "",
		},
	});

	// Initialize form values
	useEffect(() => {
		if (profile?.username) {
			form.setValue("username", profile.username, {
				shouldValidate: true, // Perform validation after updating values
				shouldDirty: false, // Not updated in case of change
			});
		}
		if (user?.email) {
			form.setValue("email", user.email, {
				shouldValidate: true,
				shouldDirty: false,
			});
		}
	}, [form, profile?.username, user?.email]);

	// ----------------------------------------------
	// Submit
	// ----------------------------------------------
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (data: FormValues) => {
		if (!profile?.id) {
			toast.error("Profile not found.");
			return;
		}

		try {
			setIsLoading(true);
			toast.promise(
				updateProfile({
					id: profile.id,
					username: data.username,
					// Email is can not be changed
				}),
				{
					loading: "Updating...",
					success: "Your profile has been updated!",
					error: "Something went wrong. Please try again.",
				},
			);
		} catch (error) {
			toast.error("Something went wrong. Please try again.");

			// TODO: エラーメッセージを入れてNoticeを表示する
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="container max-w-screen-lg">
			<PageTitle
				title={t("UserInfo.accountPreferences")}
				description={t("UserInfo.accountPreferencesDescription")}
			/>

			{/* <Notice
				variant="destructive"
				title="Heads up!"
				text="You can add components and dependencies to your app using the cli."
			/> */}

			<div className="grid gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Profile</CardTitle>
						{/* <CardDescription>Update your profile information.</CardDescription> */}
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-4 mb-6">
							<Avatar className="h-20 w-20">
								<AvatarImage
									src={profile?.avatar_url ?? ""}
									alt={profile?.username ?? ""}
								/>
								<AvatarFallback className="bg-muted text-muted-foreground">
									{profile?.username?.substring(0, 2).toUpperCase() ?? "??"}
								</AvatarFallback>
							</Avatar>
							<div>
								<h3 className="font-medium">Profile Picture</h3>
								<p className="text-sm text-muted-foreground">
									Your profile picture is managed by your authentication
									provider.
								</p>
							</div>
						</div>

						{/* <Form
							schema={LogInWithEmailSchema(
								t as unknown as (key: string) => string,
							)}
							onSubmit={onSubmit}
							noValidate
							aria-label="Log in form"
							className={cn("grid")}
						>
							{({ formState }) => (
								<>
									<div className="grid gap-6">
										<UsernameField<FormValues> name="username" />
										<EmailField<FormValues> name="email" />
									</div>
									<Button type="submit" disabled={isLoading}>
										{isLoading ? "Updating..." : "Update Profile"}
									</Button>
								</>
							)}
						</Form> */}
					</CardContent>
				</Card>

				<DangerZone />
			</div>
		</div>
	);
}
