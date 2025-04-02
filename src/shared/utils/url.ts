import { env } from "@/config/env";

/**
 * Type guard to check if a URL string is valid (not undefined and not empty after trimming)
 *
 * @param url - The URL string to validate
 * @returns True if the URL is a non-empty string
 * @example
 * ```ts
 * isValidUrl("https://example.com") // => true
 * isValidUrl("  ") // => false
 * isValidUrl(undefined) // => false
 * ```
 */
const isValidUrl = (url: string | undefined): url is string => {
	return Boolean(url?.trim());
};

/**
 * Removes trailing slashes from a URL
 *
 * @param url - The URL to normalize
 * @returns URL without trailing slashes
 * @example
 * ```ts
 * normalizeUrl("https://example.com/") // => "https://example.com"
 * normalizeUrl("https://example.com///") // => "https://example.com"
 * normalizeUrl("https://example.com") // => "https://example.com"
 * ```
 */
const normalizeUrl = (url: string): string => {
	return url.replace(/\/+$/, "");
};

/**
 * Ensures a URL starts with http:// or https://
 *
 * @param url - The URL to check and potentially modify
 * @returns URL with http(s):// prefix
 * @example
 * ```ts
 * ensureHttps("example.com") // => "https://example.com"
 * ensureHttps("http://example.com") // => "http://example.com"
 * ensureHttps("https://example.com") // => "https://example.com"
 * ```
 */
const ensureHttps = (url: string): string => {
	return url.includes("http") ? url : `https://${url}`;
};

/**
 * Removes leading slashes from a path
 *
 * @param path - The path to normalize
 * @returns Path without leading slashes
 * @example
 * ```ts
 * normalizePath("/path/to/resource") // => "path/to/resource"
 * normalizePath("///path") // => "path"
 * normalizePath("path") // => "path"
 * ```
 */
const normalizePath = (path: string): string => {
	return path.replace(/^\/+/, "");
};

/**
 * Get the full URL of the site.
 *
 * @param path - Optional path to append to the base URL
 * @returns The complete site URL with optional path
 * @throws Error if NEXT_PUBLIC_VERCEL_URL is not set or is empty
 * @example
 * When NEXT_PUBLIC_VERCEL_URL is "https://example.com"
 *
 * ```ts
 * getSiteUrl() // => "https://example.com"
 * getSiteUrl("api") // => "https://example.com/api"
 * getSiteUrl("/api/") // => "https://example.com/api"
 * ```
 */
export const getSiteUrl = (path = ""): string => {
	if (!isValidUrl(env.NEXT_PUBLIC_VERCEL_URL)) {
		throw new Error("NEXT_PUBLIC_VERCEL_URL is not set or is empty");
	}

	const baseUrl = env.NEXT_PUBLIC_VERCEL_URL;
	const normalizedUrl = normalizeUrl(baseUrl);
	const secureUrl = ensureHttps(normalizedUrl);
	const normalizedPath = normalizePath(path);

	return normalizedPath ? `${secureUrl}/${normalizedPath}` : secureUrl;
};
