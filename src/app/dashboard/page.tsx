import BitbucketConnectRepositoryCard from "@/features/bitbucket/components/bitbucket-connect-repository-card";
import CycleTimeDashboard from "@/features/github/components/cycle-time";
import GitHubConnectRepositoryCard from "@/features/github/components/github-connect-repository-card";
import { GitLabConnectRepositoryCard } from "@/features/gitlab/components/gitlab-connect-repository-card";

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
