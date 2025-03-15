import type { GitHubCommit } from "./github-api"; // Import GitHubCommit type defined in previous code

// Type representing cycle time calculation results
export interface CycleTimeData {
	date: Date; // Commit datetime
	author: string; // Author
	commitSha: string; // Commit SHA
	message: string; // Commit message
	cycleTimeHours: number; // Time elapsed since previous commit (in hours)
}

// Three patterns are available:
// 1. Time difference between consecutive commits (implementing this first)
// 2. Time from first commit to last commit in a specific branch
// 3. Time from Pull Request creation to completion

/**
 * Calculates cycle time data from an array of GitHub commits
 *
 * The process:
 * 1. Sort commits chronologically
 * 2. Calculate time difference (cycle time) from previous commit for each commit
 * 3. Provide functions to calculate average cycle time by date
 * 4. Provide functions to calculate average cycle time by developer
 *
 * @param commits - Array of GitHub commits
 * @returns Array of cycle time data
 */
export function calculateCycleTimes(commits: GitHubCommit[]): CycleTimeData[] {
	// Sort commits chronologically (oldest first)
	const sortedCommits = [...commits].sort((a, b) => {
		if (!a.commit.author?.date || !b.commit.author?.date) {
			throw new Error("Commit date is missing");
		}

		const dateA = new Date(a.commit.author.date);
		const dateB = new Date(b.commit.author.date);
		return dateA.getTime() - dateB.getTime();
	});

	// Calculate cycle time for each commit
	const cycleTimeData: CycleTimeData[] = [];

	for (let i = 0; i < sortedCommits.length; i++) {
		const commit = sortedCommits[i];
		if (!commit.commit.author?.date) {
			throw new Error("Commit date is missing");
		}

		const commitDate = new Date(commit.commit.author.date);

		// Calculate cycle time (first commit's cycle time is 0)
		let cycleTimeHours = 0;
		if (i > 0) {
			if (
				!sortedCommits[i - 1] ||
				!sortedCommits[i - 1].commit.author === null ||
				!sortedCommits[i - 1].commit.author?.date
			) {
				throw new Error("Previous commit is missing");
			}

			const prevCommitDate = new Date(
				sortedCommits[i - 1].commit.author?.date ?? "",
			);
			const diffMs = commitDate.getTime() - prevCommitDate.getTime();
			cycleTimeHours = diffMs / (1000 * 60 * 60); // Convert milliseconds to hours
		}

		cycleTimeData.push({
			date: commitDate,
			author: commit.commit.author.name ?? "",
			commitSha: commit.sha,
			message: commit.commit.message,
			cycleTimeHours: cycleTimeHours,
		});
	}

	return cycleTimeData;
}

/**
 * Calculates average cycle time by date
 *
 * @param cycleTimeData - Array of cycle time data
 * @returns Array of objects containing date and average cycle time
 */
export function calculateDailyCycleTimeAverage(
	cycleTimeData: CycleTimeData[],
): Array<{ date: string; averageCycleTime: number }> {
	const dailyData: Record<string, { sum: number; count: number }> = {};

	// Aggregate data by date
	for (const item of cycleTimeData) {
		const dateStr = item.date.toISOString().split("T")[0]; // YYYY-MM-DD format

		if (!dailyData[dateStr]) {
			dailyData[dateStr] = { sum: 0, count: 0 };
		}

		dailyData[dateStr].sum += item.cycleTimeHours;
		dailyData[dateStr].count++;
	}

	// Calculate average by date
	const result = Object.entries(dailyData).map(([date, data]) => ({
		date,
		averageCycleTime: data.sum / data.count,
	}));

	// Sort by date
	return result.sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Calculates average cycle time by developer
 *
 * @param cycleTimeData - Array of cycle time data
 * @returns Array of objects containing author, average cycle time, and commit count
 */
export function calculateAuthorCycleTimeAverage(
	cycleTimeData: CycleTimeData[],
): Array<{ author: string; averageCycleTime: number; commitCount: number }> {
	const authorData: Record<string, { sum: number; count: number }> = {};

	// Aggregate data by developer
	for (const item of cycleTimeData) {
		if (!authorData[item.author]) {
			authorData[item.author] = { sum: 0, count: 0 };
		}

		authorData[item.author].sum += item.cycleTimeHours;
		authorData[item.author].count++;
	}

	// Calculate average by developer
	return Object.entries(authorData).map(([author, data]) => ({
		author,
		averageCycleTime: data.sum / data.count,
		commitCount: data.count,
	}));
}
