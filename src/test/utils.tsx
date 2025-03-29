import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";

import messages from "@/messages/en.json";

/**
 * A custom renderer that includes necessary providers for testing React components.
 * This includes:
 * - NextIntlClientProvider for internationalization
 * - Any other providers needed for the application
 */
export function renderWithProviders(ui: ReactNode) {
	return render(
		<NextIntlClientProvider messages={messages} locale="en">
			{ui}
		</NextIntlClientProvider>,
	);
}
