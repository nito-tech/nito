"use client";

import { GitBranch } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Notice } from "@/components/Notice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchUserRepositories } from "@/features/github/lib/github-api";
import type { Repository } from "@/features/github/lib/github-api";

export default function CallbackPage() {
	const searchParams = useSearchParams();
	const code = searchParams.get("code");
	const [message, setMessage] = useState<string>(
		"Getting authorization code from GitHub",
	);
	const [token, setToken] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [repositories, setRepositories] = useState<Repository[]>([]);
	const [showRepos, setShowRepos] = useState<boolean>(false);
	const [searchQuery, setSearchQuery] = useState<string>("");

	/**
	 * Exchanges the authorization code for an access token.
	 *
	 * @param authCode
	 */
	const exchangeCodeForToken = async (authCode: string) => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/github/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ code: authCode }),
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to exchange code for token");
			}

			setToken(data.access_token);
			setMessage("Successfully exchanged code for token");

			// Save the token to local storage (consider a more secure method in a real app)
			// localStorage.setItem("github_token", data.access_token);

			console.log("Access Token:", data.access_token);
			console.log("Token Type:", data.token_type);
			console.log("Scope:", data.scope);
		} catch (err) {
			console.error("Token exchange error:", err);
			setError(err instanceof Error ? err.message : "Unknown error");
			setMessage("Failed to exchange code for token");
		} finally {
			setIsLoading(false);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!code) {
			setMessage("Error: No authorization code found");
			return;
		}

		setMessage(`Get auth code : ${code}`);

		exchangeCodeForToken(code);
	}, [code]);

	const fetchRepositories = async () => {
		if (!token) return;

		setIsLoading(true);
		try {
			const repos = await fetchUserRepositories(token);
			setRepositories(repos);
			setShowRepos(true);
		} catch (err) {
			console.error("Error fetching repositories:", err);
			setError(
				err instanceof Error ? err.message : "Failed to fetch repositories",
			);
		} finally {
			setIsLoading(false);
		}
	};

	const filteredRepositories = repositories.filter((repo) => {
		const name = repo.name.toLowerCase();
		const description = repo.description?.toLowerCase();
		const query = searchQuery.toLowerCase();

		return name.includes(query) || description?.includes(query);
	});

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("ja-JP", {
			year: "numeric",
			month: "numeric",
			day: "numeric",
		}).format(date);
	};

	return (
		// min-h-screen
		<div className="flex justify-center items-center p-4">
			<Card className="w-full max-w-3xl">
				<CardHeader>
					<CardTitle>Success GitHub Authentication!</CardTitle>
				</CardHeader>
				<CardContent>
					<p>{message}</p>

					{code && !token && !error && isLoading && (
						<div className="mt-4 p-4 text-center">
							<p>Fetching access token...</p>
						</div>
					)}

					{error && <Notice variant="destructive" text={error} />}

					{code && (
						<div className="mt-4">
							<p className="text-sm font-medium mb-1">Auth Code:</p>
							<div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md overflow-auto text-xs">
								<code>{code}</code>
							</div>
						</div>
					)}

					{token && (
						<div className="mt-4">
							<p className="text-sm font-medium mb-1">Access Token:</p>
							<div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md overflow-auto text-xs">
								<code>
									{/* {token.substring(0, 10)}...{token.substring(token.length - 5)} */}
									{token}
								</code>
							</div>

							{!showRepos ? (
								<Button
									onClick={fetchRepositories}
									className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
									disabled={isLoading}
								>
									<GitBranch className="mr-2 h-4 w-4" />
									Show Repositories
								</Button>
							) : (
								<div className="mt-6">
									<div className="flex items-center justify-between mb-4">
										<h3 className="text-lg font-medium">Repositories</h3>
										<Badge variant="outline">{repositories.length}件</Badge>
									</div>

									<Input
										className="mb-4"
										placeholder="Search repositories..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
									/>

									{isLoading ? (
										<div className="text-center py-4">Loading...</div>
									) : (
										<div className="space-y-4 max-h-96 overflow-y-auto">
											{filteredRepositories.length > 0 ? (
												filteredRepositories.map((repo) => (
													<div
														key={repo.id}
														className="border rounded-lg p-4 bg-white dark:bg-gray-800"
													>
														<div className="flex justify-between items-start">
															<div>
																<h4 className="font-medium text-blue-600 dark:text-blue-400">
																	<a
																		href={repo.html_url}
																		target="_blank"
																		rel="noopener noreferrer"
																	>
																		{repo.name}
																	</a>
																</h4>
																{repo.description && (
																	<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
																		{repo.description}
																	</p>
																)}
															</div>
															{repo.private ? (
																<Badge className="bg-yellow-600">Private</Badge>
															) : (
																<Badge className="bg-green-600">Public</Badge>
															)}
														</div>
														<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-3 space-x-4">
															{repo.language && (
																<span className="flex items-center">
																	<span className="w-3 h-3 rounded-full bg-blue-500 mr-1" />
																	{repo.language}
																</span>
															)}
															<span>
																Updated: {formatDate(repo.updated_at)}
															</span>
														</div>
													</div>
												))
											) : (
												<div className="text-center py-4 text-gray-500">
													{searchQuery
														? "No repositories found"
														: "No repositories available"}
												</div>
											)}
										</div>
									)}
								</div>
							)}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
