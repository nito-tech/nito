import path from "node:path";
import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-a11y",
		"@storybook/addon-essentials",
		"@storybook/addon-onboarding",
		"@chromatic-com/storybook",
		"@storybook/experimental-addon-test",
		"storybook-addon-themes",
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
				port: 6008,
			},
			resolve: {
				alias: {
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
