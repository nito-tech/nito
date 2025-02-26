"use client";

import { createBrowserClient as createClient } from "@supabase/ssr";

import { supabaseKey, supabaseUrl } from "../supabase";

export function createBrowserClient() {
	return createClient(supabaseUrl, supabaseKey);
}
