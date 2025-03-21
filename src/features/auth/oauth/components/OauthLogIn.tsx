"use client";

import { useTranslations } from "next-intl";

import { useGithubLogin } from "../hooks/useGithubLogin";
import { GitHubLoginButton } from "./GitHubLoginButton";

interface Props {
	className?: string;
}

/**
 * A component for handling OAuth login
 */
export default function OauthLogIn({ className }: Props) {
	const t = useTranslations("Auth");
	const { isSubmitting, signInWithGithub } = useGithubLogin();

	return (
		<div className={className}>
			<GitHubLoginButton
				onClick={signInWithGithub}
				isSubmitting={isSubmitting}
				label={t("logInWithGithub")}
			/>
		</div>
	);
}
