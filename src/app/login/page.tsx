import { useTranslations } from "next-intl";
import Link from "next/link";

import { Divider } from "@/components/Divider";
import EmailAuthForm from "@/features/auth/email/components/EmailAuthForm";
import OauthLogIn from "@/features/auth/oauth/components/OauthLogIn";

export default function LoginPage() {
	const t = useTranslations("Auth");

	return (
		// Set minimum height to full viewport height minus header height
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
			<div className="w-72 flex flex-col items-center">
				<h1 className="text-3xl font-black mb-4">{t("logIn")}</h1>

				<EmailAuthForm type="logIn" className="my-6 w-full" />
				<Divider className="px-1" />
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
