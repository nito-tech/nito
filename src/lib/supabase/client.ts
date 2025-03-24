"use client";

import { createBrowserClient as createClient } from "@supabase/ssr";

import { supabaseAnonKey, supabaseUrl } from "./config";

export function createBrowserClient() {
	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error("Missing Supabase environment variables");
	}

	return createClient(supabaseUrl, supabaseAnonKey);
}
