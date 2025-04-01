import path from "node:path";
import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";

/**
 * Generate mock aliases for Storybook
 */
function generateMockAliases() {
	const mockAliases: Record<string, string> = {};
	const srcDir = path.resolve(__dirname, "../src");

	const useUsernameMockPath = path.resolve(
		`${srcDir}/features/auth/email/hooks`,
		"useUsername.mock.ts",
	);
	mockAliases["../../../features/auth/email/hooks/useUsername"] =
		useUsernameMockPath;

	return mockAliases;
}

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-a11y",
		"@storybook/addon-essentials",
		"@storybook/addon-onboarding",
		"@storybook/addon-themes", // Switch themes
		"@storybook/experimental-addon-test", // Use vitest plugin
		"@storybook/manager-api",
		"@chromatic-com/storybook",
		"storybook-addon-tag-badges", // Display Storybook tags as badges in the sidebar and toolbar.
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
