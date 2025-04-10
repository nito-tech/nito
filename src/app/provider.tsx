"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTranslations } from "next-intl";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type * as React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { AuthProvider } from "@/shared/contexts/AuthContext";
import { ProfileProvider } from "@/shared/contexts/ProfileContext";
import { useRootQueryClient } from "@/shared/lib/useRootQueryClient";
import { Button } from "@/shared/ui/button";

type AppProviderProps = {
	children: React.ReactNode;
};

const MainErrorFallback = () => {
	const t = useTranslations();

	return (
		<div
			className="flex h-screen w-screen flex-col items-center justify-center text-destructive"
			role="alert"
		>
			<h2 className="font-semibold">{t("Error.title")}</h2>
			<Button
				className="mt-4"
				onClick={() => window.location.assign(window.location.origin)}
			>
				{t("refresh")}
			</Button>
		</div>
	);
};

export const AppProvider = ({ children }: AppProviderProps) => {
	const queryClient = useRootQueryClient();

	return (
		<ErrorBoundary FallbackComponent={MainErrorFallback}>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<NuqsAdapter>
						{process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
						<ProfileProvider>{children}</ProfileProvider>
					</NuqsAdapter>
				</AuthProvider>
			</QueryClientProvider>
		</ErrorBoundary>
	);
};
