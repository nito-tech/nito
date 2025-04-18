import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
		GITHUB_CLIENT_SECRET: z.string(),
	},
	client: {
		NEXT_PUBLIC_VERCEL_URL: z.string().optional(),
		NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
		NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
		NEXT_PUBLIC_GITHUB_CLIENT_ID: z.string(),
	},
	runtimeEnv: {
		// Load .env.[NODE_ENV]
		NODE_ENV: process.env.NODE_ENV,

		/**
		 * Base URL of the site
		 */
		// Vercel default env
		NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,

		/**
		 * Supabase
		 */
		NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,

		/**
		 * GitHub
		 *
		 * Development: https://github.com/settings/applications/2908037
		 * Production: https://github.com/settings/applications/2921283
		 */
		NEXT_PUBLIC_GITHUB_CLIENT_ID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
		GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
	},
	skipValidation:
		!!process.env.SKIP_ENV_VALIDATION || process.env.NODE_ENV === "test",
	emptyStringAsUndefined: true,
});
