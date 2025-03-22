import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsconfigPaths(), react()],
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
