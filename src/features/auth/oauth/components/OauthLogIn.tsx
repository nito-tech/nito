"use client";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import githubSvg from "@/components/icon/github.svg";
import { Button } from "@/components/ui/button";

import { logInWithOAuth } from "../actions";

interface Props {
	className?: string;
}

export default function OauthLogIn({ className }: Props) {
	const t = useTranslations("Auth");

	const [isSubmitting, setIsSubmitting] = useState(false);

	async function signInWithGithub() {
		// Since Supabase uses a free plan, only two projects (production and preview) can be created.
		// Therefore, since the project in the development environment is not created,
		// the callback URL cannot be set and the login function is not used.
		if (process.env.NODE_ENV === "development") {
			toast.warning("Not implemented in the local environment", {
				description: "Please login with your Email and Password",
				duration: 8000,
			});
			return;
		}

		try {
			setIsSubmitting(true);
			const url = await logInWithOAuth("github");

			// router.push cannot be used to redirect to an external site.
			window.location.href = url;
		} catch (error) {
			console.error("GitHub login error:", error);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className={className}>
			<Button
				onClick={signInWithGithub}
				disabled={isSubmitting}
				className="w-full"
			>
				<Image
					src={githubSvg}
					alt="GitHub Icon"
					width={24}
					height={24}
					className="invert dark:invert-0"
				/>
				<div className="flex flex-items-center justify-center">
					{isSubmitting ? (
						<Loader2 className="animate-spin" />
					) : (
						t("logInWithGithub")
					)}
				</div>
			</Button>
		</div>
	);
}
