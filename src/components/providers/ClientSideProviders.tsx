"use client";

import { useRootQueryClient } from "@/data/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

export function ClientSideProviders({
	children,
}: { children: React.ReactNode }) {
	const queryClient = useRootQueryClient();

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
