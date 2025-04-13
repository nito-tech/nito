"use server";

import type { GitHubCommit } from "@/features/github/components/cycle-time";
import { mastra } from "@/mastra";

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

	// const agent = mastra.getAgent("cycleTimeAgent");
	// const result = await agent.generate(message);

	// return result.text

	return (
		"まず、このプロジェクトについて確認させてください：\n" +
		"\n" +
		"1. このプロジェクトの正式名称は何でしょうか？\n" +
		"2. チームメンバーは Alice, Bob, Charlie, Dave, Eve の5名で間違いないでしょうか？\n" +
		"3. この期間（2025年1月15日〜3月16日）でチームの人数に変動はありましたか？\n" +
		"\n" +
		"現時点での分析を以下に示します：\n" +
		"\n" +
		"### 1. 全体的な傾向分析\n" +
		"- 総コミット数：90件（約2ヶ月間）\n" +
		"- 1日あたりの平均コミット数：約1.5件\n" +
		"- 開発者別コミット数：\n" +
		"  - Charlie: 20件\n" +
		"  - Dave: 19件\n" +
		"  - Alice: 18件\n" +
		"  - Bob: 15件\n" +
		"  - Eve: 11件\n" +
		"\n" +
		"### 2. ボトルネックの特定\n" +
		"- コミットの不均一な分布：週末のコミットが少なく、週の中盤に集中\n" +
		"- Eve のコミット数が他のメンバーと比較して少ない\n" +
		"- コミットの連続性が低く、作業の中断が多い可能性\n" +
		"\n" +
		"### 3. 改善のための具体的な提案\n" +
		"- デイリースタンドアップの導入/改善によるタスク進捗の可視化\n" +
		"- ペアプログラミングの導入（特にEveと他メンバーとの協業）\n" +
		"- コードレビュープロセスの最適化\n" +
		"- 週次の振り返りミーティングの実施\n" +
		"\n" +
		"### 4. 優先度の高い次のアクション3つ\n" +
		"1. Eve のコミット数が少ない原因の調査と必要なサポートの提供\n" +
		"2. チーム全体のコミットパターンの均一化（作業の平準化）\n" +
		"3. コードレビュープロセスの効率化による開発サイクルの短縮\n" +
		"\n" +
		"より詳細な分析とアクションプランの提案のため、上記の質問へのご回答をお願いいたします。"
	); //result.text;
}
