import { GitCommit } from "lucide-react";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Separator } from "@/shared/ui/separator";

import type { GitHubCommit } from "../lib/github-api";

interface Props {
	commits: GitHubCommit[];
	repoName: string;
	isLoading: boolean;
}

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(date);
};

export function CommitList({ commits, repoName, isLoading }: Props) {
	if (isLoading) {
		return <div className="text-center py-4">Loading commits...</div>;
	}

	if (commits.length === 0) {
		return (
			<div className="text-center py-4 text-gray-500">No commits found</div>
		);
	}

	return (
		<div className="space-y-4 max-h-96 overflow-y-auto">
			<h3 className="text-lg font-medium text-info bg-info-foreground px-4 py-2 rounded-lg">
				Commits for {repoName}
			</h3>
			{commits.map((commit) => (
				<div
					key={commit.sha}
					className="border rounded-lg p-4 bg-white dark:bg-gray-800"
				>
					<div className="flex items-start">
						<Avatar className="h-10 w-10 mr-4">
							<AvatarImage
								src={commit.author?.avatar_url || ""}
								alt={commit.author?.login || commit.commit.author?.name}
							/>
							<AvatarFallback>
								{(commit.author?.login || commit.commit.author?.name || "UN")
									.substring(0, 2)
									.toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<p className="font-medium break-words">{commit.commit.message}</p>
							<div className="flex items-center text-sm text-gray-500 mt-1">
								<p>
									<span className="font-medium">
										{commit.author?.login || commit.commit.author?.name}
									</span>{" "}
									committed on {formatDate(commit.commit.author?.date ?? "")}
								</p>
							</div>
						</div>
					</div>
					<Separator className="my-2" />
					<div className="flex items-center text-sm">
						<a
							href={commit.html_url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 hover:underline flex items-center"
						>
							<GitCommit className="h-4 w-4 mr-1" />{" "}
							{commit.sha.substring(0, 7)}
						</a>
					</div>
				</div>
			))}
		</div>
	);
}
