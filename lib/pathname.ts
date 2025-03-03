/**
 * Array of routes accessible without authentication
 */
export const publicPathnames = ["/"] as const;

export const authPathnames = ["/signup", "/login"] as const;

export function isAuthPage(pathname: string) {
	return authPathnames.some((path) => pathname.startsWith(path));
}

export function isPublicPage(pathname: string) {
	return publicPathnames.some((path) => {
		if (path === "/") {
			// Check for exact match if the path is the root
			return pathname === "/";
		}
		return pathname.startsWith(path);
	});
}

export function isAuthRequiredPage(pathname: string) {
	return !isAuthPage(pathname) && !isPublicPage(pathname);
}
