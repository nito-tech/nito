"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@/lib/supabase/client";

export default function Dashboard() {
	const router = useRouter();
	const supabase = createBrowserClient();

	async function signOut() {
		const { error } = await supabase.auth.signOut();

		if (!error) {
			router.push("/login");
		}
	}

	return (
		<div style={{ display: "flex", height: "100vh" }}>
			<aside style={{ width: "250px", padding: "20px" }}>
				<ul>
					<li>Dashboard</li>
					<li>Profile</li>
					<li>Settings</li>
					<li>
						<Button
							onClick={signOut}
							variant="outline"
							style={{ display: "flex", alignItems: "center" }}
						>
							<LogOut style={{ marginRight: "8px" }} />
							Logout
						</Button>
					</li>
				</ul>
			</aside>
			<main style={{ flex: 1, padding: "20px" }}>
				<h1>Dashboard Content</h1>
			</main>
		</div>
	);
}
