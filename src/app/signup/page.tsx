import { useTranslations } from "next-intl";
import Link from "next/link";

import { EmailSignUpForm } from "@/features/signup/ui/email-signup-form";

export default function SignUpPage() {
	const t = useTranslations("Auth");

	return (
		// Set minimum height to full viewport height minus header height
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
			<div className="w-72">
				<h1 className="text-3xl font-black mb-4 flex flex-col items-center">
					{t("signUp")}
				</h1>

				<EmailSignUpForm className="my-6 w-full" />

				<div className="w-full">
					<p>{t("alreadyHaveAccount")}</p>
					<p>
						<Link
							href="/signin/password_signin"
							className="font-light text-sm underline"
						>
							{t("logIn")}
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
