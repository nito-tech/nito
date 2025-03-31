import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { env } from "@/config/env";
import { getSiteUrl } from "@/utils/url";

const GITHUB_CLIENT_ID = env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;
const GITHUB_REDIRECT_URI = `${getSiteUrl("/dashboard/callback")}`;

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { code } = body;

		if (!code) {
			return NextResponse.json(
				{ error: "Authorization code is required" },
				{ status: 400 },
			);
		}

		console.log("Received authorization code:", code);
		console.log("Exchange parameters:", {
			client_id: GITHUB_CLIENT_ID,
			client_secret: "[REDACTED]",
			redirect_uri: GITHUB_REDIRECT_URI,
		});

		const tokenResponse = await fetch(
			"https://github.com/login/oauth/access_token",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					client_id: GITHUB_CLIENT_ID,
					client_secret: GITHUB_CLIENT_SECRET,
					code: code,
					redirect_uri: GITHUB_REDIRECT_URI,
				}),
			},
		);

		console.log("GitHub API response status:", tokenResponse.status);
		console.log(
			"GitHub API response headers:",
			Object.fromEntries(tokenResponse.headers.entries()),
		);

		const tokenData = await tokenResponse.json();

		console.log("GitHub API response:", {
			...tokenData,
			access_token: tokenData.access_token ? "[REDACTED]" : undefined,
		});

		if (tokenData.error) {
			console.error("GitHub token error:", tokenData);
			return NextResponse.json(
				{ error: tokenData.error_description || "Failed to get access token" },
				{ status: 400 },
			);
		}

		return NextResponse.json({
			access_token: tokenData.access_token,
			token_type: tokenData.token_type,
			scope: tokenData.scope,
		});
	} catch (error) {
		console.error("Token exchange error:", error);

		return NextResponse.json(
			{ error: "Internal server error during token exchange" },
			{ status: 500 },
		);
	}
}
