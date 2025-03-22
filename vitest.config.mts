import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	define: {
		"process.env": {
			NODE_ENV: "test",
			NEXT_PUBLIC_VERCEL_URL: "http://localhost:3210",
			NEXT_PUBLIC_SUPABASE_ANON_KEY: "dummy-key-for-testing",
			NEXT_PUBLIC_SUPABASE_URL: "http://dummy-host:9999",
			NEXT_PUBLIC_GITHUB_CLIENT_ID: "dummy-github-client-id",
			GITHUB_CLIENT_SECRET: "test_github_client_secret",
			SKIP_ENV_VALIDATION: "true", // Skip validation during tests
		},
		__dirname: JSON.stringify(""),
	},
	test: {
		name: "vitest",
		environment: "jsdom",
		include: ["**/*.test.{ts,tsx}"],
		setupFiles: ["./tests/vitest.setup.ts"],
		reporters: process.env.GITHUB_ACTIONS ? ["dot", "github-actions"] : ["dot"],
		isolate: true,
		browser: {
			enabled: true,
			headless: true, // Do not open http://localhost:63319/ to view test results
			provider: "playwright",
			// Commented out to avoid the error
			// `Error: Vitest failed to find the current suite. This is a bug in Vitest. Please, open an issue with reproduction.
			// instances: [
			// 	{
			// 		name: "vitest-chromium",
			// 		browser: "chromium",
			// 	},
			// ],
		},
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
	},
});
