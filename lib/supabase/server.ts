"use server";

import { createServerClient as createClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { supabaseKey, supabaseUrl } from "./config";

export async function createServerClient() {
	const cookieStore = await cookies();

	return createClient(supabaseUrl, supabaseKey, {
		cookies: {
			getAll() {
				return cookieStore.getAll();
			},
			setAll(cookiesToSet) {
				try {
					for (const cookie of cookiesToSet) {
						cookieStore.set(cookie.name, cookie.value, cookie.options);
					}
				} catch {
					// The `setAll` method was called from a Server Component.
					// This can be ignored if you have middleware refreshing
					// user sessions.
				}
			},
		},
	});
}
