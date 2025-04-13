import React from "react";

declare global {
	const vi: typeof import("vitest")["vi"];
}

// In the local environment, we don't use mocks to avoid the error:
// "Parentheses to avoid the error 'Vitest failed to access its internal state.'"
if (process.env.CI === "true") {
	/**
	 * Mock implementation for Next.js Image component
	 *
	 * This replaces the Next.js Image component with a standard img element in Storybook
	 */
	vi.mock("next/image", () => {
		return {
			__esModule: true,
			default: ({
				src,
				alt,
				width,
				height,
				className,
				style,
				...props
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			}: any) => {
				// Handle object form src
				const imgSrc = typeof src === "object" && "src" in src ? src.src : src;

				// Return React element
				return React.createElement("img", {
					src: imgSrc,
					alt,
					width,
					height,
					className,
					style,
					...props,
				});
			},
		};
	});
}
