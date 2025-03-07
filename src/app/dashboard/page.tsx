import LogOutButton from "@/features/auth/logout/components/LogOutButton";
import BitbucketConnectRepositoryCard from "@/features/bitbucket/components/BitbucketConnectRepositoryCard";
import GitHubConnectRepositoryCard from "@/features/github/components/GitHubConnectRepositoryCard";
import { GitLabConnectRepositoryCard } from "@/features/gitlab/components/GitLabConnectRepositoryCard";

export default function DashboardPage() {
	return (
		<div style={{ display: "flex", height: "100vh" }}>
			<aside style={{ width: "250px", padding: "20px" }}>
				<ul>
					<li>Dashboard</li>
					<li>Profile</li>
					<li>Settings</li>
					<li>
						<LogOutButton />
					</li>
				</ul>
			</aside>
			<main>
				<h1>Dashboard Content</h1>

				<div>
					<h3>アカウントと連携し、リポジトリのコミット情報を取得します。</h3>
					<p className="text-sm text-muted-foreground">
						・Select repository to fetch commit logs and analyze.
					</p>
					<p className="text-sm text-muted-foreground">
						・This application requires access to your GitHub repositories.
					</p>
					<p className="text-sm text-muted-foreground">
						・You can revoke access at any time from your GitHub settings.
					</p>
				</div>

				<div className="space-y-4">
					<GitHubConnectRepositoryCard />
					<GitLabConnectRepositoryCard />
					<BitbucketConnectRepositoryCard />
				</div>
			</main>
		</div>
	);
}
