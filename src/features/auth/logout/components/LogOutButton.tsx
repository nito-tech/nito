"use client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

import { logOut } from "../actions";

export default function LogOutButton() {
	return (
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
	);
}
