"use client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { logOut } from "./actions";

export default function Dashboard() {
	return (
		<div style={{ display: "flex", height: "100vh" }}>
			<aside style={{ width: "250px", padding: "20px" }}>
				<ul>
					<li>Dashboard</li>
					<li>Profile</li>
					<li>Settings</li>
					<li>
						<form action={logOut}>
							<Button
								type="submit"
								variant="outline"
								style={{ display: "flex", alignItems: "center" }}
							>
								<LogOut style={{ marginRight: "8px" }} />
								Log out
							</Button>
						</form>
					</li>
				</ul>
			</aside>
			<main style={{ flex: 1, padding: "20px" }}>
				<h1>Dashboard Content</h1>
			</main>
		</div>
	);
}
