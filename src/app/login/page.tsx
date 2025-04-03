import { useTranslations } from "next-intl";
import Link from "next/link";

import OauthLogIn from "@/features/auth/oauth/components/OauthLogIn";
import { EmailLogInForm } from "@/features/auth/ui/EmailLogInForm";
import { Separator } from "@/shared/ui/separator";

export default function LoginPage() {
	const t = useTranslations("Auth");

	return (
		// Set minimum height to full viewport height minus header height
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
			<div className="w-72">
				<h1 className="text-3xl font-black mb-4 flex flex-col items-center">
					{t("logIn")}
				</h1>

				<EmailLogInForm className="my-6 w-full" />
				<Separator className="border-border my-2" />
				<OauthLogIn className="my-6 w-full" />

				<div className="w-full">
					<p>
						<Link href="/signup" className="font-light text-sm underline">
							{t("dontHaveAccount")} {t("signUp")}
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
