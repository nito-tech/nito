"use client";

import Image from "next/image";
import React from "react";

import githubSvg from "@/components/icon/github.svg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;

// URI for redirecting after authentication
const REDIRECT_URI = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI;

// Specify the required scopes
const scope = "repo user:email";

export default function GitHubAuthCard() {
	const handleAuthorize = () => {
		const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=${scope}&redirect_uri=${REDIRECT_URI}`;

		// Redirect to the GitHub authentication page
		window.location.href = authUrl;
	};

	return (
		// min-h-screen
		//  bg-gray-50 dark:bg-gray-900
		<div className="flex justify-center items-center">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle className="text-xl font-bold">
						Select a GitHub repository
					</CardTitle>
					{/* <CardDescription></CardDescription> */}
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div>
							<p className="text-sm text-muted-foreground">
								・Select the GitHub repository to fetch commit logs and analyze.
							</p>
							<p className="text-sm text-muted-foreground">
								・This application requires access to your GitHub repositories.
							</p>
							<p className="text-sm text-muted-foreground">
								・You can revoke access at any time from your GitHub settings.
							</p>
						</div>

						<Button onClick={handleAuthorize} className="w-full">
							<Image
								src={githubSvg}
								alt="GitHub Icon"
								width={24}
								height={24}
								className="invert dark:invert-0"
							/>
							Authorize with GitHub
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
