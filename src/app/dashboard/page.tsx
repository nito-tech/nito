import LogOutButton from "@/features/auth/logout/components/LogOutButton";
import GitHubAuthCard from "@/features/github/components/GitHubAuthCard";

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
			<main style={{ flex: 1, padding: "20px" }}>
				<h1>Dashboard Content</h1>

				<div className="items-center justify-center mb-8 space-x-2">
					<GitHubAuthCard />
				</div>
			</main>
		</div>
	);
}
