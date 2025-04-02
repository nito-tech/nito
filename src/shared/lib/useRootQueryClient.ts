"use client";

import { QueryClient, onlineManager } from "@tanstack/react-query";
import { useState } from "react";

import { ResponseError } from "@/types/base";

/**
 * Configure different online states for development and preview/production environments
 *
 * Reasons for setting setOnline(true) in development environment:
 * 1. Improved Development Efficiency
 *    - Development can proceed without internet connection
 *    - Mock data can be used locally
 *    - Faster development environment startup
 * 2. Test Stability
 *    - Stable test environment independent of internet connection
 *    - Improved test execution speed
 *    - Enhanced test reproducibility
 * 3. Easier Debugging
 *    - Avoid complex conditional branching due to offline states
 *    - Provide an environment focused on development
 *    - Easier error cause identification
 *
 * Reasons for not setting setOnline(true) in preview/production environments:
 * 1. Enhanced User Experience
 *    - Proper handling of offline states
 *    - Accurate status notification to users
 *    - Provision of offline fallback features
 * 2. Data Consistency
 *    - Real-time data synchronization
 *    - Offline data storage and sync
 *    - Prevention of data inconsistencies
 * 3. Security and Reliability
 *    - Offline security measures
 *    - Proper error handling implementation
 *    - Improved system reliability
 * 4. Offline Feature Testing
 *    - Verification of actual offline behavior
 *    - Error case validation
 *    - Fallback feature verification
 */
if (process.env.NODE_ENV === "development") {
	onlineManager.setOnline(true);
}

let queryClient: QueryClient | undefined;

export function getQueryClient() {
	const _queryClient =
		queryClient ??
		new QueryClient({
			defaultOptions: {
				queries: {
					staleTime: 5 * 60 * 1000, // Data will be considered fresh for 5 minutes
					retry(failureCount, error) {
						// Don't retry on 4xx errors
						if (
							error instanceof ResponseError &&
							error.code !== undefined &&
							error.code >= 400 &&
							error.code < 500
						) {
							return false;
						}

						if (failureCount < 3) {
							return true;
						}

						return false;
					},
				},
			},
		});

	// For SSG and SSR always create a new queryClient
	if (typeof window === "undefined") {
		return _queryClient;
	}

	// Create the queryClient once in the client
	if (!queryClient) {
		queryClient = _queryClient;
	}

	return queryClient;
}

export function useRootQueryClient() {
	const [_queryClient] = useState(() => getQueryClient());

	return _queryClient;
}
