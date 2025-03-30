"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { ControllerRenderProps } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { PageTitle } from "@/components/PageTitle";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/contexts/ProfileContext";
import { deleteAccount } from "@/lib/queries/auth";

const formSchema = z.object({
	username: z.string().min(1, "Username is required"),
});

type FormValues = z.infer<typeof formSchema>;

function DangerZone() {
	const t = useTranslations();
	const router = useRouter();

	const [isDeleting, setIsDeleting] = useState(false);

	const onDeleteAccount = async () => {
		try {
			setIsDeleting(true);
			await deleteAccount();
			toast.success("Your account has been deleted.");
			router.push("/");
		} catch (error) {
			toast.error("Something went wrong. Please try again.");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<Card className="border-destructive">
			<CardHeader>
				<CardTitle className="text-destructive">
					{t("UserInfo.dangerZone")}
				</CardTitle>
				<CardDescription>{t("UserInfo.dangerZoneDescription")}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between">
					<div>
						<h3 className="font-medium">{t("UserInfo.deleteAccount")}</h3>
						<p className="text-sm text-muted-foreground">
							{t("UserInfo.deleteAccountDescription")}
						</p>
					</div>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="destructive">
								{t("UserInfo.deleteAccount")}
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									{t("UserInfo.deleteAccountConfirmation")}
								</AlertDialogTitle>
								<AlertDialogDescription>
									{t("UserInfo.deleteAccountConfirmationDescription")}
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>{t("Action.cancel")}</AlertDialogCancel>
								<AlertDialogAction
									onClick={onDeleteAccount}
									disabled={isDeleting}
									className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
								>
									{isDeleting ? t("Action.deleting") : t("Action.delete")}
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</CardContent>
		</Card>
	);
}

export default function AccountPage() {
	const t = useTranslations();

	const { user } = useAuth();
	const { profile, updateProfile } = useProfile();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: profile?.username ?? "",
		},
	});

	useEffect(() => {
		if (profile?.username) {
			form.setValue("username", profile.username);
		}
	}, [profile?.username, form]);

	const onSubmit = async (data: FormValues) => {
		if (!profile?.id) {
			toast.error("Profile not found.");
			return;
		}

		try {
			setIsLoading(true);
			await updateProfile({
				id: profile.id,
				username: data.username,
			});
			toast.success("Your profile has been updated.");
		} catch (error) {
			toast.error("Something went wrong. Please try again.");
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

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4"
							>
								<FormField
									control={form.control}
									name="username"
									render={({
										field,
									}: {
										field: ControllerRenderProps<FormValues, "username">;
									}) => (
										<FormItem>
											<FormLabel>{t("UserInfo.username")}</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex flex-col gap-2">
									<Label>{t("UserInfo.email")}</Label>
									<Input value={user?.email ?? ""} disabled />
								</div>

								<div className="flex items-center gap-4">
									<Button type="submit" disabled={isLoading}>
										{isLoading ? "Updating..." : "Update Profile"}
									</Button>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>

				<DangerZone />
			</div>
		</div>
	);
}
