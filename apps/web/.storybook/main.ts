import path from "node:path";
import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";

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
		return {
			...config,
			server: {
				...config.server,
				port: 6006,
			},
			resolve: {
				alias: {
					"@": path.resolve(__dirname, "../src"),
					// "#features": path.resolve(__dirname, "../src/features"),
					// "#entities": path.resolve(__dirname, "../src/entities"),
					// "#shared": path.resolve(__dirname, "../src/shared"),
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
