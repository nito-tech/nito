import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import { storybookNextJsPlugin } from "@storybook/experimental-nextjs-vite/vite-plugin";
import { defineConfig, defineWorkspace } from "vitest/config";

const dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

export default defineWorkspace([
	// This is the path to your existing Vitest config file
	"./vitest.config.mts",
	defineConfig({
		// This is the path to your existing Vite config file
		// extends: "./vite.config.mts",
		plugins: [
			// See options at: https://storybook.js.org/docs/writing-tests/vitest-plugin#storybooktest
			storybookTest({
				// The location of your Storybook config, main.js|ts
				configDir: path.join(dirname, ".storybook"),
				// This should match your package.json script to run Storybook
				// The --ci flag will skip prompts and not open a browser
				storybookScript: "yarn storybook --ci",
			}),

			// More info at: https://github.com/storybookjs/vite-plugin-storybook-nextjs
			storybookNextJsPlugin(),
		],
		test: {
			name: "storybook",
			// environment: "jsdom",
			include: ["**/*.stories.?(m)[jt]s?(x)"],
			setupFiles: ["./.storybook/vitest.setup.ts"],
			// isolate: true,
			browser: {
				enabled: true,
				provider: "playwright",
				headless: true,
				instances: [
					{
						name: "storybook-chromium",
						browser: "chromium",
					},
				],
			},

			/**
			 * WARNING: Vitest Coverage With Storybook Integration Note
			 *
			 * Running coverage that includes Storybook tests can cause errors such as:
			 * "Error: Vitest failed to find the current suite. This is a bug in Vitest."
			 *
			 * This occurs when using commands like:
			 * - `npx vitest --coverage`
			 * - `npx vitest --project=storybook --coverage`
			 *
			 * To resolve this issue, run your tests in the following sequence:
			 * 1. First run non-Storybook tests: `npx vitest --project=vitest`
			 * 2. Then run Storybook tests: `npx vitest --project=storybook`
			 */
			// coverage: {
			// 	provider: "v8",
			// 	exclude: [
			// 		"**/*.test.*",
			// 		"**/.storybook/**",
			// 		// 👇 This pattern must align with the `stories` property of your `.storybook/main.ts` config
			// 		"**/*.stories.*",
			// 		// 👇 This pattern must align with the output directory of `storybook build`
			// 		"**/storybook-static/**",
			// 	],
			// },
		},
	}),
]);
