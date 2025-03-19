import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import { storybookNextJsPlugin } from "@storybook/experimental-nextjs-vite/vite-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		// See options at: https://storybook.js.org/docs/writing-tests/vitest-plugin#storybooktest
		storybookTest(),
		// More info at: https://github.com/storybookjs/vite-plugin-storybook-nextjs
		storybookNextJsPlugin(),
	],
	define: {
		"process.env": {
			GITHUB_CLIENT_SECRET: "test_github_client_secret",
			NEXT_PUBLIC_VERCEL_URL: "http://localhost:3210",
			NEXT_PUBLIC_SUPABASE_URL: "http://dummy-host:9999",
			NEXT_PUBLIC_SUPABASE_ANON_KEY: "dummy-key-for-testing",
			NEXT_PUBLIC_GITHUB_CLIENT_ID: "dummy-github-client-id",
			SKIP_ENV_VALIDATION: "true", // Skip validation during tests
			NODE_ENV: "test",
		},
		__dirname: JSON.stringify(""),
	},
	test: {
		name: "storybook",
		environment: "jsdom",
		include: ["**/*.stories.?(m)[jt]s?(x)"],
		setupFiles: ["./.storybook/vitest.setup.ts"],
		reporters: process.env.GITHUB_ACTIONS ? ["dot", "github-actions"] : ["dot"],
		isolate: true,
		browser: {
			enabled: true,
			headless: true, // Do not open http://localhost:63319/ to view test results
			name: "chromium",
			provider: "playwright",
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
