import fs from "node:fs";
import path from "node:path";
import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";

/**
 * Generate mock aliases for Storybook subpath imports
 */
function generateMockAliases() {
	const mockAliases: Record<string, string> = {};
	const hooksDir = path.resolve(__dirname, "../src/features/auth/email/hooks");

	// Search files in the directory
	const files = fs.readdirSync(hooksDir);
	for (const file of files) {
		if (file.endsWith(".mock.ts")) {
			const mockName = file.replace(".mock.ts", "");
			const mockPath = path.resolve(hooksDir, file);

			// Relative path alias
			mockAliases[`../hooks/${mockName}`] = mockPath;
			// Absolute path alias
			mockAliases[`src/features/auth/email/hooks/${mockName}`] = mockPath;
		}
	}

	return mockAliases;
}

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-a11y",
		"@storybook/addon-essentials",
		"@storybook/addon-onboarding",
		"@chromatic-com/storybook",
		"@storybook/experimental-addon-test",
		"storybook-addon-themes",
		"storybook-addon-tag-badges",
		"@storybook/manager-api",
	],
	framework: {
		name: "@storybook/experimental-nextjs-vite",
		options: {},
	},
	staticDirs: ["../public"],
	core: {
		disableTelemetry: true,
	},
	viteFinal: async (config) => {
		const mockAliases = generateMockAliases();

		return {
			...config,
			server: {
				...config.server,
				port: 6006,
			},
			resolve: {
				alias: {
					...mockAliases,
					"@": path.resolve(__dirname, "../src"),
					components: path.resolve(__dirname, "../src/components"),
					lib: path.resolve(__dirname, "../src/lib"),
				},
			},
			optimizeDeps: {
				include: [
					"react-hook-form",
					"@hookform/resolvers/zod",
					"next-intl",
					"lucide-react",
					"next/image",
				],
			},
		};
	},
};

export default config;
