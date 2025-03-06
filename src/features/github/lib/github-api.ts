import { Octokit } from "octokit";

export type Repository = {
	id: number;
	name: string;
	full_name: string;
	private: boolean;
	html_url: string;
	description: string | null;
	updated_at: string;
	language: string | null;
};

/**
 * Creates an Octokit instance using the provided access token.
 *
 * @param token - The access token for authenticating to the GitHub API.
 * @returns An instance of Octokit configured with the provided token.
 */
export function createOctokit(token: string) {
	return new Octokit({
		auth: token,
	});
}

/**
 * Fetches the authenticated user's repositories from GitHub.
 *
 * @param token - The access token for authenticating to the GitHub API.
 * @returns A promise that resolves to an array of repositories.
 */
export async function fetchUserRepositories(
	token: string,
): Promise<Repository[]> {
	const octokit = createOctokit(token);

	try {
		// Fetch the authenticated user's repositories
		const response = await octokit.rest.repos.listForAuthenticatedUser({
			sort: "updated",
			per_page: 100,
		});

		return response.data as Repository[];
	} catch (error) {
		console.error("Error fetching repositories:", error);
		throw error;
	}
}

/**
 * Fetches the repositories for the specified organization from GitHub.
 *
 * @param token - The access token for authenticating to the GitHub API.
 * @param org - The name of the organization.
 * @returns A promise that resolves to an array of repositories.
 */
export async function fetchOrganizationRepositories(
	token: string,
	org: string,
): Promise<Repository[]> {
	const octokit = createOctokit(token);

	try {
		const response = await octokit.rest.repos.listForOrg({
			org,
			sort: "updated",
			per_page: 100,
		});

		console.log(response.data);

		return response.data as Repository[];
	} catch (error) {
		console.error("Error fetching organization repositories:", error);
		throw error;
	}
}
