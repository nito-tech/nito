import { getRequestConfig } from "next-intl/server";

import { getUserLocale } from "@/services/locale";

/**
 * Get the request configuration for internationalization.
 *
 * This function provides a static locale, fetches a user setting,
 * or reads from `cookies()`, `headers()`, etc.
 *
 * @returns {Promise<{locale: string, messages: object}>} The locale and messages.
 */
export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
