"use client";

import Image from "next/image";
import React from "react";

import { ConnectRepositoryCard } from "@/components/card/connect-repository-card";
import bitbucketSvg from "@/shared/icon/bitbucket.svg";

/**
 * Bitbucket authentication card component.
 *
 * When the button is clicked, you will be redirected to Bitbucket and authenticated there.
 * If successful, you will be redirected to REDIRECT_URI.
 */
export default function BitbucketConnectRepositoryCard() {
	return (
		<ConnectRepositoryCard
			title="Bitbucket"
			description="Connect to your Bitbucket account to access repositories"
			iconImage={
				<Image
					src={bitbucketSvg}
					alt="Bitbucket Icon"
					width={24}
					height={24}
					className="invert-0 dark:invert"
				/>
			}
			disabled
		/>
	);
}
