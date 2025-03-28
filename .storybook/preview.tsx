import type { Decorator, Preview } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import React from "react";

import messages from "../src/messages/en.json";
import "../src/app/globals.css";

const withNextIntl: Decorator = (Story) => {
	return (
		<NextIntlClientProvider locale="en" messages={messages}>
			<Story />
		</NextIntlClientProvider>
	);
};

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [withNextIntl],
};

export default preview;
