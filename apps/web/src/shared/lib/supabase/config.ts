import { env } from "@/shared/config/env";

export const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || "";
export const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
