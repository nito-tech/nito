import BitbucketConnectRepositoryCard from "@/features/bitbucket/components/BitbucketConnectRepositoryCard";
import CycleTimeDashboard from "@/features/github/components/CycleTime";
import GitHubConnectRepositoryCard from "@/features/github/components/GitHubConnectRepositoryCard";
import { GitLabConnectRepositoryCard } from "@/features/gitlab/components/GitLabConnectRepositoryCard";

export default function DashboardPage() {
	return (
		<main className="space-y-8">
			<CycleTimeDashboard />

			<div>
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
	);
}
