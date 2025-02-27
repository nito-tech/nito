"use client";

import { createBrowserClient as createClient } from "@supabase/ssr";

import { supabaseKey, supabaseUrl } from "./config";

export function createBrowserClient() {
	return createClient(supabaseUrl, supabaseKey);
}
