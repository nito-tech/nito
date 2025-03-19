import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import { storybookNextJsPlugin } from "@storybook/experimental-nextjs-vite/vite-plugin";
import { defineWorkspace } from "vitest/config";

const dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

export default defineWorkspace([
	// This is the path to your existing Vitest config file
	"./vitest.config.mts",
	{
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
			// Enable browser mode
			browser: {
				enabled: true,
				name: "chromium",
				// Make sure to install Playwright
				provider: "playwright",
				headless: true,
			},
		},
	},
]);
