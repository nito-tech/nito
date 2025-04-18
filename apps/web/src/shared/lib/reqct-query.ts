import type {
	DefaultOptions,
	UseMutationOptions,
	UseQueryOptions,
} from "@tanstack/react-query";

export const queryConfig = {
	queries: {
		// throwOnError: true,
		refetchOnWindowFocus: false,
		retry: false,
		staleTime: 60 * 1000, // 1 minute
	},
} satisfies DefaultOptions;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type QueryConfig<T extends (...args: any[]) => any> = Omit<
	UseQueryOptions<Awaited<ReturnType<T>>, Error>,
	"queryKey" | "queryFn"
>;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
	Awaited<ReturnType<FnType>>;

export type MutationConfig<
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	MutationFnType extends (...args: any) => Promise<any>,
> = UseMutationOptions<
	ApiFnReturnType<MutationFnType>,
	Error,
	Parameters<MutationFnType>[0]
>;
