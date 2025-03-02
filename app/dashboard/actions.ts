"use server";

import { redirect } from "next/navigation";

import { createServerClient } from "@/lib/supabase/server";

export async function signOut() {
	const supabase = await createServerClient();

	const { error } = await supabase.auth.signOut();

	if (error) {
		throw new Error("Failed to sign out");
	}

	redirect("/login");
}
