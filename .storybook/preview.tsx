import type { Decorator, Preview } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import React from "react";

import messages from "../src/messages/en.json";
import "../src/app/globals.css";
import "./mockNextImage";

const withNextIntl: Decorator = (Story) => {
	return (
		<NextIntlClientProvider locale="en" messages={messages}>
			<Story />
		</NextIntlClientProvider>
	);
};

const preview: Preview = {
	parameters: {
		nextjs: {
			// https://storybook.js.org/docs/get-started/nextjs#set-nextjsappdirectory-to-true
			appDirectory: true,
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		docs: {
			stories: {
				// Display only stories with the "code-only" tag
				filter: (story) => story.tags?.includes("code-only"),
			},
		},
	},
	decorators: [withNextIntl],
};

export default preview;
