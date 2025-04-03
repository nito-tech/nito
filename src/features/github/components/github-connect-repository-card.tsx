"use client";

import Image from "next/image";
import React from "react";

import { ConnectRepositoryCard } from "@/components/card/connect-repository-card";
import { env } from "@/shared/config/env";
import githubSvg from "@/shared/icon/github.svg";
import { getSiteUrl } from "@/shared/utils/url";

const GITHUB_CLIENT_ID = env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
const REDIRECT_URI = getSiteUrl("/dashboard/callback");

// Specify the required scopes
const scope = "repo user:email";

/**
 * GitHub authentication card component.
 *
 * When the button is clicked, you will be redirected to GitHub and authenticated there.
 * If successful, you will be redirected to REDIRECT_URI.
 */
export default function GitHubConnectRepositoryCard() {
	const handleAuthorize = () => {
		const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=${scope}&redirect_uri=${REDIRECT_URI}`;

		// Redirect to the GitHub authentication page
		window.location.href = authUrl;
	};

	return (
		<ConnectRepositoryCard
			title="GitHub"
			description="Connect to your GitHub account to access repositories"
			iconImage={
				<Image
					src={githubSvg}
					alt="GitHub Icon"
					width={24}
					height={24}
					className="invert-0 dark:invert"
				/>
			}
			disabled={!GITHUB_CLIENT_ID || !REDIRECT_URI}
			onClick={handleAuthorize}
		/>
	);
}
