import type { CycleTimeData } from "./commit-analytics";

// Data type for line charts in Recharts
export interface CycleTimeChartData {
	date: string; // X-axis date (YYYY-MM-DD format)
	value: number; // Y-axis value (cycle time)
	author?: string; // Additional info: author
	commitSha?: string; // Additional info: commit SHA
	message?: string; // Additional info: commit message
}

// Default window size for moving average calculation (7 days)
const DEFAULT_WINDOW_SIZE = 7;

/**
 * Transforms daily cycle time data for Recharts line charts
 *
 * @param cycleTimeData - Array of cycle time data
 * @returns Data formatted for Recharts visualization
 */
export function transformForDailyChart(
	cycleTimeData: CycleTimeData[],
): CycleTimeChartData[] {
	return cycleTimeData.map((item) => ({
		date: item.date.toISOString().split("T")[0], // YYYY-MM-DD format
		value: Number.parseFloat(item.cycleTimeHours.toFixed(2)), // Round to 2 decimal places
		author: item.author,
		commitSha: item.commitSha,
		message: item.message,
	}));
}

/**
 * Aggregates cycle time data by week
 *
 * @param cycleTimeData - Array of cycle time data
 * @returns Data aggregated by week with average cycle times and commit counts
 */
export function aggregateByWeek(
	cycleTimeData: CycleTimeData[],
): Array<{ week: string; averageCycleTime: number; commitCount: number }> {
	// Object to store data grouped by week
	const weeklyData: Record<string, { sum: number; count: number }> = {};

	for (const item of cycleTimeData) {
		const date = new Date(item.date);
		const day = date.getDay();
		const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
		const monday = new Date(date.setDate(diff));
		const weekKey = monday.toISOString().split("T")[0]; // Week start in YYYY-MM-DD format

		if (!weeklyData[weekKey]) {
			weeklyData[weekKey] = { sum: 0, count: 0 };
		}

		weeklyData[weekKey].sum += item.cycleTimeHours;
		weeklyData[weekKey].count++;
	}

	// Calculate average per week
	const result = Object.entries(weeklyData).map(([week, data]) => ({
		week,
		averageCycleTime: Number.parseFloat((data.sum / data.count).toFixed(2)),
		commitCount: data.count,
	}));

	// Sort by week date
	return result.sort((a, b) => a.week.localeCompare(b.week));
}

/**
 * Calculates moving average to smooth cycle time trends
 *
 * @param chartData - Recharts line chart data
 * @param windowSize - Size of the moving average window (default: 7)
 * @returns Data with added moving average values
 */
export function addMovingAverage(
	chartData: CycleTimeChartData[],
	windowSize: number = DEFAULT_WINDOW_SIZE,
): Array<CycleTimeChartData & { movingAverage: number | null }> {
	// Sort by date
	const sortedData = [...chartData].sort((a, b) =>
		a.date.localeCompare(b.date),
	);

	return sortedData.map((item, index) => {
		// Calculate moving average
		let movingAverage = null;

		if (index >= windowSize - 1) {
			// Get data within the window and calculate average
			const windowData = sortedData.slice(index - windowSize + 1, index + 1);
			const sum = windowData.reduce((acc, curr) => acc + curr.value, 0);
			movingAverage = Number.parseFloat((sum / windowData.length).toFixed(2));
		}

		return {
			...item,
			movingAverage,
		};
	});
}

/**
 * Detects and processes outliers (e.g., values more than 3 standard deviations from the mean)
 *
 * @param chartData - Recharts line chart data
 * @returns Data with added outlier flags
 */
export function detectOutliers(
	chartData: CycleTimeChartData[],
): Array<CycleTimeChartData & { isOutlier: boolean }> {
	// Calculate mean and standard deviation
	const values = chartData.map((item) => item.value);
	const mean = values.reduce((sum, val) => sum + val, 0) / values.length;

	const squaredDiffs = values.map((val) => (val - mean) ** 2);
	const variance =
		squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
	const stdDev = Math.sqrt(variance);

	// Threshold (3 standard deviations)
	const threshold = 3 * stdDev;

	// Add outlier flags
	return chartData.map((item) => ({
		...item,
		isOutlier: Math.abs(item.value - mean) > threshold,
	}));
}

/**
 * Prepares data in multiple time units for Recharts dashboard
 *
 * @param cycleTimeData - Array of cycle time data
 * @returns Object containing daily, weekly, and monthly data
 */
export function prepareMultiTimeUnitData(cycleTimeData: CycleTimeData[]) {
	// Daily data
	const dailyData = transformForDailyChart(cycleTimeData);
	const dailyWithMovingAvg = addMovingAverage(dailyData);

	// Weekly data
	const weeklyData = aggregateByWeek(cycleTimeData);

	// Calculate monthly data
	const monthlyData: Record<string, { sum: number; count: number }> = {};

	for (const item of cycleTimeData) {
		const monthKey = item.date.toISOString().substring(0, 7); // YYYY-MM format (using substring instead of deprecated substr)

		if (!monthlyData[monthKey]) {
			monthlyData[monthKey] = { sum: 0, count: 0 };
		}

		monthlyData[monthKey].sum += item.cycleTimeHours;
		monthlyData[monthKey].count++;
	}

	const monthlyResult = Object.entries(monthlyData)
		.map(([month, data]) => ({
			month,
			averageCycleTime: Number.parseFloat((data.sum / data.count).toFixed(2)),
			commitCount: data.count,
		}))
		.sort((a, b) => a.month.localeCompare(b.month));

	return {
		daily: dailyWithMovingAvg,
		weekly: weeklyData,
		monthly: monthlyResult,
	};
}
