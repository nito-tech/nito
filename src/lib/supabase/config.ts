import { env } from "@/env";

export const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || "";
export const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
