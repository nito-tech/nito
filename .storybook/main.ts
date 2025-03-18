import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
	addons: [
		"@storybook/addon-essentials",
		"@storybook/addon-onboarding",
		"@chromatic-com/storybook",
		"@storybook/experimental-addon-test",
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
		};
	},
};

export default config;
