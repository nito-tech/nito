import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	test: {
		environment: "jsdom",
		include: ["**/*.test.{ts,tsx}"],
		reporters: process.env.GITHUB_ACTIONS ? ["dot", "github-actions"] : ["dot"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html", "json-summary"],
			include: ["**/*.{ts,tsx}"],
			exclude: [
				"next.config.ts",
				"next-env.d.ts",
				"i18n/**/*.{ts,tsx}",
				"e2e/**/*.{ts,tsx}",
			],
			reportsDirectory: "./coverage",
			// thresholds: {
			// 	// FIXME: Increase the threshold values to 80%.
			// 	statements: 20,
			// 	branches: 20,
			// 	functions: 20,
			// 	lines: 20,
			// },
		},
		env: {
			NEXT_PUBLIC_VERCEL_URL: "http://localhost:3210",
			NEXT_PUBLIC_SUPABASE_URL: "http://dummy-host:9999",
			NEXT_PUBLIC_SUPABASE_ANON_KEY: "dummy-key-for-testing",
			NEXT_PUBLIC_GITHUB_CLIENT_ID: "dummy-github-client-id",
			NEXT_PUBLIC_GITHUB_REDIRECT_URI:
				"http://localhost:3210/dashboard/callback",
			SKIP_ENV_VALIDATION: "true", // Skip validation during tests
		},
	},
});
