import { withThemeByClassName } from "@storybook/addon-themes";
import type { Decorator, Preview } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextIntlClientProvider } from "next-intl";
import React from "react";

import { AuthProvider } from "../src/shared/contexts/AuthContext";
import messages from "../src/shared/i18n/messages/en.json";
import "../app/globals.css";
import "./mockNextImage";

const withNextIntl: Decorator = (Story) => {
	return (
		<NextIntlClientProvider locale="en" messages={messages}>
			<Story />
		</NextIntlClientProvider>
	);
};

const withAuthProvider: Decorator = (Story) => {
	return (
		<AuthProvider>
			<Story />
		</AuthProvider>
	);
};

const queryClient = new QueryClient();

const withQueryClient: Decorator = (Story) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Story />
		</QueryClientProvider>
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
		// The background color needs to be transparent here,
		// otherwise the background color won't change when the theme is changed by withThemeByClassName
		backgrounds: {
			default: "transparent",
		},
		docs: {
			stories: {
				// Display only stories with the "code-only" tag
				filter: (story) => story.tags?.includes("code-only"),
			},
		},
	},
	decorators: [
		withNextIntl,
		withAuthProvider,
		withQueryClient,
		withThemeByClassName({
			themes: {
				light: "",
				dark: "dark",
			},
			defaultTheme: "light",
		}),
	],
};

export default preview;
