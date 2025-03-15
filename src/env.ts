import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {},
	client: {
		NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
		NEXT_PUBLIC_VERCEL_URL: z.string().optional(),
		NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
		NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
		NEXT_PUBLIC_GITHUB_CLIENT_ID: z.string(),
		NEXT_PUBLIC_GITHUB_REDIRECT_URI: z.string().url(),
	},
	runtimeEnv: {
		/**
		 * Base URL of the site
		 */
		// Only used in local
		NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
		// Vercel default env
		NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,

		/**
		 * Supabase
		 */
		NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,

		/**
		 * GitHub
		 */
		NEXT_PUBLIC_GITHUB_CLIENT_ID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
		// URI for redirecting after authentication
		NEXT_PUBLIC_GITHUB_REDIRECT_URI:
			process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI,
	},
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
});
