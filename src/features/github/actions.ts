"use server";

import { mastra } from "@/mastra";
import type { GitHubCommit } from "./components/CycleTime";

export async function getCycleTimeSummary(commits: GitHubCommit[]) {
	const jsonCommit = commits.map((c) => ({
		sha: c.sha,
		author: {
			name: c.commit.author.name,
			email: c.commit.author.email,
			date: c.commit.author.date,
		},
		committer: {
			name: c.commit.committer.name,
			email: c.commit.committer.email,
			date: c.commit.committer.date,
		},
		message: c.commit.message,
		html_url: c.html_url,
		githubAuthor: c.author
			? {
					login: c.author.login,
					avatar_url: c.author.avatar_url,
				}
			: null,
	}));

	const message = `
		## 要望
		サイクルタイムデータを分析し、以下の形式で回答してください：

    1. 全体的な傾向分析
    2. ボトルネックの特定
    3. 改善のための具体的な提案
    4. 優先度の高い次のアクション3つ

		## コミット履歴

		${JSON.stringify(jsonCommit, null, 2)}
	`;

	const agent = mastra.getAgent("cycleTimeAgent");
	const result = await agent.generate(message);

	return result.text;
}
