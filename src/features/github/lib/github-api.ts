import { Octokit as _Octokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import type { Api } from "@octokit/plugin-rest-endpoint-methods";
import type { Endpoints } from "@octokit/types";

const Octokit = _Octokit.plugin(restEndpointMethods);

/**
 * Creates an Octokit instance using the provided access token.
 *
 * @param token - The access token for authenticating to the GitHub API.
 * @returns An instance of Octokit configured with the provided token.
 */
function createOctokit(token: string): _Octokit & Api {
	return new Octokit({
		auth: token,
	});
}

export type GitHubUserRepository =
	Endpoints["GET /user/repos"]["response"]["data"][0];

/**
 * Fetches the authenticated user's repositories from GitHub.
 *
 * @param token - The access token for authenticating to the GitHub API.
 * @returns A promise that resolves to an array of repositories.
 */
export async function fetchUserRepositories(
	token: string,
): Promise<GitHubUserRepository[]> {
	const octokit = createOctokit(token);

	try {
		const response = await octokit.rest.repos.listForAuthenticatedUser({
			sort: "updated",
			per_page: 100,
		});

		return response.data;
	} catch (error) {
		console.error("Error fetching repositories:", error);
		throw error;
	}
}

type GitHubOrganizationRepository =
	Endpoints["GET /orgs/{org}/repos"]["response"]["data"][0];

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
): Promise<GitHubOrganizationRepository[]> {
	const octokit = createOctokit(token);

	try {
		const response = await octokit.rest.repos.listForOrg({
			org,
			sort: "updated",
			per_page: 100,
		});

		console.log(response.data);

		return response.data;
	} catch (error) {
		console.error("Error fetching organization repositories:", error);
		throw error;
	}
}

export type GitHubCommit =
	Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"][0];

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
): Promise<GitHubCommit[]> {
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

		console.log("✅-------------------------------");
		console.log(response);
		// console.log(response.data);

		return response.data;
	} catch (error) {
		console.error(`Error fetching commits for ${owner}/${repo}:`, error);
		throw error;
	}
}

export type GitHubUser = Endpoints["GET /user"]["response"]["data"];

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

		return response.data;
	} catch (error) {
		console.error("Error fetching user info:", error);
		throw error;
	}
}
