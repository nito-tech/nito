import React from "react";
import { vi } from "vitest";

/**
 * Mock implementation for Next.js Image component
 *
 * This replaces the Next.js Image component with a standard img element in Storybook
 */
vi.mock("next/image", () => {
	return {
		__esModule: true,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		default: ({ src, alt, width, height, className, style, ...props }: any) => {
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
