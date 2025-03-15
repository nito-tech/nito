import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { env } from "@/env";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Get the full URL of the site.
 */
export const getSiteUrl = (path = "") => {
	let url = "http://localhost:3210/";

	if (env.NEXT_PUBLIC_SITE_URL && env.NEXT_PUBLIC_SITE_URL.trim() !== "") {
		// If the environment variable NEXT_PUBLIC_SITE_URL is set
		url = env.NEXT_PUBLIC_SITE_URL;
	} else if (
		env.NEXT_PUBLIC_VERCEL_URL &&
		env.NEXT_PUBLIC_VERCEL_URL.trim() !== ""
	) {
		// If the automatically set environment variable NEXT_PUBLIC_VERCEL_URL by Vercel is set
		url = env.NEXT_PUBLIC_VERCEL_URL;
	}

	// Trim the URL and remove trailing slash if exists.
	url = url.replace(/\/+$/, "");

	// Make sure to include `https://` when not localhost.
	url = url.includes("http") ? url : `https://${url}`;

	// Ensure path starts without a slash to avoid double slashes in the final URL.
	const newPath = path.replace(/^\/+/, "");

	return newPath ? `${url}/${newPath}` : url;
};
