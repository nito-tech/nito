import { Octokit as _Octokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";

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

const Octokit = _Octokit.plugin(restEndpointMethods);

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

export type CommitInfo = {
	sha: string;
	commit: {
		author: {
			name: string;
			email: string;
			date: string;
		};
		committer: {
			name: string;
			email: string;
			date: string;
		};
		message: string;
	};
	html_url: string;
	author: {
		login: string;
		avatar_url: string;
	} | null;
};

/**
 * Fetches the commits for the specified repository from GitHub.
 *
 * @param token - The access token for authenticating to the GitHub API.
 * @param owner - The owner of the repository.
 * @param repo - The name of the repository.
 * @returns A promise that resolves to an array of commit information.
 */
export async function fetchRepositoryCommits(
	token: string,
	owner: string,
	repo: string,
): Promise<CommitInfo[]> {
	const octokit = createOctokit(token);

	try {
		const response = await octokit.rest.repos.listCommits({
			owner,
			repo,
			per_page: 30, // Get the latest 30 commits
		});

		if (!response.data || response.data.length === 0) {
			console.warn(`No commits found for ${owner}/${repo}.`);
		}

		return response.data as CommitInfo[];
	} catch (error) {
		console.error(`Error fetching commits for ${owner}/${repo}:`, error);
		throw error;
	}
}

export type GitHubUser = {
	id: number;
	login: string;
	name: string | null;
	html_url: string;
	avatar_url: string;
};

/**
 * Fetches the authenticated user's information from GitHub.
 *
 * @param token - The access token for authenticating to the GitHub API.
 * @returns A promise that resolves to the user's information or null if not found.
 */
export async function fetchUserInfo(token: string): Promise<GitHubUser | null> {
	const octokit = createOctokit(token);

	try {
		const response = await octokit.rest.users.getAuthenticated();

		if (!response.data) {
			console.warn("No user info found.");
			return null; // or handle the case as needed
		}

		const user = {
			id: response.data.id,
			login: response.data.login,
			name: response.data.name,
			html_url: response.data.html_url,
			avatar_url: response.data.avatar_url,
		};

		return user;
	} catch (error) {
		console.error("Error fetching user info:", error);
		throw error;
	}
}
