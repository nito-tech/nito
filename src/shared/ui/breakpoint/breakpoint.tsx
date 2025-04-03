import React from "react";

import { env } from "@/shared/config/env";
import { cn } from "@/shared/utils/cn";

export const Breakpoint = () => {
	if (env.NODE_ENV === "production") {
		return null;
	}

	return (
		<div
			data-testid="breakpoint-indicator"
			className={cn(
				"flex items-center justify-center text-xs text-white h-6 w-6 rounded-full",
				"fixed top-0 right-0 m-6 mt-16 p-3 z-99999",
				"bg-gray-700 sm:bg-pink-500 md:bg-orange-500 lg:bg-green-500 xl:bg-blue-500 2xl:bg-purple-500",
			)}
		>
			<div data-testid="breakpoint-xs" className="not-sr-only sm:sr-only">
				xs
			</div>
			<div
				data-testid="breakpoint-sm"
				className="sr-only sm:not-sr-only md:sr-only"
			>
				sm
			</div>
			<div
				data-testid="breakpoint-md"
				className="sr-only md:not-sr-only lg:sr-only"
			>
				md
			</div>
			<div
				data-testid="breakpoint-lg"
				className="sr-only lg:not-sr-only xl:sr-only"
			>
				lg
			</div>
			<div
				data-testid="breakpoint-xl"
				className="sr-only xl:not-sr-only 2xl:sr-only"
			>
				xl
			</div>
			<div data-testid="breakpoint-2xl" className="sr-only 2xl:not-sr-only">
				2xl
			</div>
		</div>
	);
};
