import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function DangerZone() {
	const t = useTranslations();
	const router = useRouter();

	const [isDeleting, setIsDeleting] = useState(false);

	const onDeleteAccount = async () => {
		try {
			setIsDeleting(true);
			// await deleteAccount();

			// toast.promise(
			// 	updateProfile({
			// 		id: profile.id,
			// 		username: data.username,
			// 		// Email is can not be changed
			// 	}),
			// 	{
			// 		loading: "Updating...",
			// 		success: "Your profile has been updated!",
			// 		error: "Something went wrong. Please try again.",
			// 	},
			// );

			toast.success("Your account has been deleted.");
			router.push("/");
		} catch (error) {
			// TODO: エラーメッセージを入れてNoticeを表示する

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
