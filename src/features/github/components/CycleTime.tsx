"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
	Bar,
	BarChart,
	Brush,
	CartesianGrid,
	Cell,
	Legend,
	Line,
	LineChart,
	Pie,
	PieChart,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
// import { getCycleTimeSummary } from "../actions";

export type GitHubCommit = {
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

type CycleTimeData = {
	date: Date;
	author: string;
	commitSha: string;
	message: string;
	cycleTimeHours: number;
};

type ChartDataItem = {
	date: string;
	value: number;
	author?: string;
	commitSha?: string;
	message?: string;
	movingAverage?: number | null;
};

/**
 * Calculates the cycle time between consecutive commits
 *
 * @param commits - Array of GitHub commits to analyze
 * @returns Array of cycle time data objects with calculated hours between commits
 */
const calculateCycleTimes = (commits: GitHubCommit[]): CycleTimeData[] => {
	// Sort commits by date (oldest first)
	const sortedCommits = [...commits].sort((a, b) => {
		const dateA = new Date(a.commit.author.date);
		const dateB = new Date(b.commit.author.date);
		return dateA.getTime() - dateB.getTime();
	});

	// Calculate cycle time for each commit
	const cycleTimeData: CycleTimeData[] = [];

	for (let i = 0; i < sortedCommits.length; i++) {
		const commit = sortedCommits[i];
		const commitDate = new Date(commit.commit.author.date);

		// Calculate cycle time (first commit's cycle time is 0)
		let cycleTimeHours = 0;
		if (i > 0) {
			const prevCommitDate = new Date(sortedCommits[i - 1].commit.author.date);
			const diffMs = commitDate.getTime() - prevCommitDate.getTime();
			cycleTimeHours = diffMs / (1000 * 60 * 60); // Convert milliseconds to hours
		}

		cycleTimeData.push({
			date: commitDate,
			author: commit.commit.author.name,
			commitSha: commit.sha,
			message: commit.commit.message,
			cycleTimeHours: cycleTimeHours,
		});
	}

	return cycleTimeData;
};

/**
 * Transforms cycle time data for daily chart visualization
 *
 * @param cycleTimeData - Array of cycle time data objects
 * @returns Formatted array of chart data items with date strings and rounded values
 */
const transformForDailyChart = (
	cycleTimeData: CycleTimeData[],
): ChartDataItem[] => {
	return cycleTimeData.map((item) => ({
		date: item.date.toISOString().split("T")[0], // YYYY-MM-DD format
		value: Number.parseFloat(item.cycleTimeHours.toFixed(2)), // Round to 2 decimal places
		author: item.author,
		commitSha: item.commitSha,
		message: item.message,
	}));
};

/**
 * Adds moving average to chart data
 *
 * @param chartData - Array of chart data items
 * @param windowSize - Size of the moving average window in days (default: 7)
 * @returns Chart data with added moving average values
 */
const addMovingAverage = (
	chartData: ChartDataItem[],
	windowSize = 7,
): ChartDataItem[] => {
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
};

/**
 * Calculates average cycle time per author
 *
 * @param cycleTimeData - Array of cycle time data objects
 * @returns Array of objects with author, average cycle time, and commit count
 */
const calculateAuthorCycleTimeAverage = (
	cycleTimeData: CycleTimeData[],
): Array<{ author: string; averageCycleTime: number; commitCount: number }> => {
	const authorData: Record<string, { sum: number; count: number }> = {};

	// Aggregate data by author
	for (const item of cycleTimeData) {
		if (!authorData[item.author]) {
			authorData[item.author] = { sum: 0, count: 0 };
		}

		authorData[item.author].sum += item.cycleTimeHours;
		authorData[item.author].count++;
	}

	// Calculate average per author
	return Object.entries(authorData).map(([author, data]) => ({
		author,
		averageCycleTime: data.sum / data.count,
		commitCount: data.count,
	}));
};

/**
 * Aggregates cycle time data by week
 *
 * @param cycleTimeData - Array of cycle time data objects
 * @returns Array of weekly cycle time data with average values
 */
const aggregateByWeek = (
	cycleTimeData: CycleTimeData[],
): Array<{ week: string; averageCycleTime: number; commitCount: number }> => {
	// Object to store data grouped by week
	const weeklyData: Record<string, { sum: number; count: number }> = {};

	for (const item of cycleTimeData) {
		// Calculate week start date (Monday)
		const date = new Date(item.date);
		const day = date.getDay();
		const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
		const monday = new Date(date.setDate(diff));
		const weekKey = monday.toISOString().split("T")[0]; // YYYY-MM-DD format

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
};

/**
 * Prepares data for multiple time units (daily, weekly, monthly)
 *
 * @param cycleTimeData - Array of cycle time data objects
 * @returns Object containing data for daily, weekly and monthly views
 */
const prepareMultiTimeUnitData = (cycleTimeData: CycleTimeData[]) => {
	// Daily data
	const dailyData = transformForDailyChart(cycleTimeData);
	const dailyWithMovingAvg = addMovingAverage(dailyData, 7);

	// Weekly data
	const weeklyData = aggregateByWeek(cycleTimeData);

	// Calculate monthly data
	const monthlyData: Record<string, { sum: number; count: number }> = {};

	for (const item of cycleTimeData) {
		const monthKey = item.date.toISOString().substring(0, 7); // YYYY-MM format

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
};

/**
 * Custom tooltip component for cycle time charts
 *
 * @param props - Standard Recharts tooltip props
 * @returns Tooltip JSX element or null if inactive
 */
interface CustomTooltipProps {
	active?: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	payload?: any[];
	label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white p-4 rounded shadow-md border border-gray-200">
				<p className="font-semibold">{`Date: ${label}`}</p>
				{payload.map((entry, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<p key={index} style={{ color: entry.color }}>
						{entry.name}: {entry.value.toFixed(2)} hours
					</p>
				))}
				{payload[0].payload.author && (
					<>
						<p className="text-gray-600 mt-2">
							Commit: {payload[0].payload.message?.split("\n")[0]}
						</p>
						<p className="text-gray-600">Author: {payload[0].payload.author}</p>
					</>
				)}
			</div>
		);
	}
	return null;
};

/**
 * Cycle time chart component
 *
 * @param props - Component props with commits and display options
 * @returns Cycle time chart component
 */
interface CycleTimeChartProps {
	commits: GitHubCommit[];
	showMovingAverage?: boolean;
	showReferenceLine?: boolean;
	referenceValue?: number;
	height?: number;
}

const CycleTimeChart = ({
	commits,
	showMovingAverage = true,
	showReferenceLine = false,
	referenceValue = 24,
	height = 400,
}: CycleTimeChartProps) => {
	const [chartData, setChartData] = useState<ChartDataItem[]>([]);

	useEffect(() => {
		if (commits.length === 0) return;

		// Calculate cycle times
		const cycleTimeData = calculateCycleTimes(commits);

		// Transform data for Recharts
		const dailyData = transformForDailyChart(cycleTimeData);

		// Add moving average
		const dataWithMovingAvg = showMovingAverage
			? addMovingAverage(dailyData, 7) // 7-day moving average
			: dailyData.map((item) => ({ ...item, movingAverage: null }));

		setChartData(dataWithMovingAvg);
	}, [commits, showMovingAverage]);

	if (chartData.length === 0) {
		return (
			<div className="flex justify-center items-center h-64 bg-gray-50 rounded">
				<p className="text-gray-400">Loading data...</p>
			</div>
		);
	}

	return (
		<div className="bg-white p-4 rounded shadow">
			<h2 className="text-lg font-semibold mb-4">Commit Cycle Time (Hours)</h2>
			<ResponsiveContainer width="100%" height={height}>
				<LineChart
					data={chartData}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" minTickGap={50} tick={{ fontSize: 12 }} />
					<YAxis
						label={{
							value: "Cycle Time (Hours)",
							angle: -90,
							position: "insideLeft",
						}}
						tick={{ fontSize: 12 }}
					/>
					<Tooltip content={<CustomTooltip />} />
					<Legend />

					{/* Cycle time line */}
					<Line
						type="monotone"
						dataKey="value"
						name="Cycle Time"
						stroke="#8884d8"
						dot={{ r: 3 }}
						activeDot={{ r: 8 }}
					/>

					{/* Moving average line (optional) */}
					{showMovingAverage && (
						<Line
							type="monotone"
							dataKey="movingAverage"
							name="7-Day Moving Average"
							stroke="#82ca9d"
							dot={false}
							strokeWidth={2}
						/>
					)}

					{/* Reference line (optional) */}
					{showReferenceLine && (
						<ReferenceLine
							y={referenceValue}
							stroke="red"
							strokeDasharray="3 3"
							label={{
								value: `Target: ${referenceValue} hours`,
								position: "insideBottomRight",
							}}
						/>
					)}

					{/* Time range selection brush */}
					<Brush
						dataKey="date"
						height={30}
						stroke="#8884d8"
						startIndex={Math.max(0, chartData.length - 30)} // Show latest 30 items
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

const COLORS = [
	"#8884d8",
	"#83a6ed",
	"#8dd1e1",
	"#82ca9d",
	"#a4de6c",
	"#d0ed57",
	"#ffc658",
];

interface DashboardData {
	timeUnitData: {
		daily: ChartDataItem[];
		weekly: Array<{
			week: string;
			averageCycleTime: number;
			commitCount: number;
		}>;
		monthly: Array<{
			month: string;
			averageCycleTime: number;
			commitCount: number;
		}>;
	};
	authorData: Array<{
		author: string;
		averageCycleTime: number;
		commitCount: number;
	}>;
}

/**
 * Main cycle time dashboard component
 *
 * @returns Full dashboard with multiple cycle time visualizations
 */
export default function CycleTimeDashboard() {
	const [commits, setCommits] = useState<GitHubCommit[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [timeUnit, setTimeUnit] = useState<"daily" | "weekly" | "monthly">(
		"weekly",
	);
	const [dashboardData, setDashboardData] = useState<DashboardData | null>(
		null,
	);
	const [aiSummary, setAiSummary] = useState<string | null>(null);
	const [aiLoading, setAiLoading] = useState(false);
	const [aiError, setAiError] = useState<string | null>(null);

	// Generate sample commit data (in real app, fetch from API)
	useEffect(() => {
		// Generate sample data
		const generateSampleCommits = () => {
			const sampleCommits: GitHubCommit[] = [];
			const now = new Date();
			// Generate sample commits for past 60 days
			for (let i = 0; i < 60; i++) {
				const date = new Date(now);
				date.setDate(date.getDate() - i);

				// 1-3 commits per day
				const commitsPerDay = Math.floor(Math.random() * 3) + 1;

				for (let j = 0; j < commitsPerDay; j++) {
					// Set random time
					date.setHours(Math.floor(Math.random() * 24));
					date.setMinutes(Math.floor(Math.random() * 60));

					const authors = ["Alice", "Bob", "Charlie", "Dave", "Eve"];
					const author = authors[Math.floor(Math.random() * authors.length)];

					sampleCommits.push({
						sha: `sample-sha-${i}-${j}`,
						commit: {
							author: {
								name: author,
								email: `${author.toLowerCase()}@example.com`,
								date: date.toISOString(),
							},
							committer: {
								name: author,
								email: `${author.toLowerCase()}@example.com`,
								date: date.toISOString(),
							},
							message: `Sample commit #${i}-${j}: Feature addition/fix`,
						},
						html_url: "https://github.com/example/repo/commit/sample-sha",
						author: {
							login: author.toLowerCase(),
							avatar_url: "https://github.com/identicons/sample.png",
						},
					});
				}
			}

			return sampleCommits;
		};

		try {
			// Generate and set sample commit data
			const sampleCommits = generateSampleCommits();
			setCommits(sampleCommits);

			// Prepare cycle time analysis data
			const cycleTimeData = calculateCycleTimes(sampleCommits);
			const multiTimeData = prepareMultiTimeUnitData(cycleTimeData);
			const authorData = calculateAuthorCycleTimeAverage(cycleTimeData);

			setDashboardData({
				timeUnitData: multiTimeData,
				authorData,
			});

			setLoading(false);
		} catch (err) {
			console.error("Error generating sample data:", err);
			setError("An error occurred while preparing data.");
			setLoading(false);
		}
	}, []);

	const handleAskAI = async () => {
		// setAiLoading(true);
		// setAiError(null);
		// setAiSummary(null);
		// try {
		// 	const summary = await getCycleTimeSummary(commits);
		// 	setAiSummary(summary);
		// } catch (err) {
		// 	setAiError(
		// 		err instanceof Error ? err.message : "予期せぬエラーが発生しました",
		// 	);
		// } finally {
		// 	setAiLoading(false);
		// }
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-xl text-gray-500">Loading data...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-xl text-red-500">{error}</div>
			</div>
		);
	}

	if (!dashboardData) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-xl text-gray-500">No data found</div>
			</div>
		);
	}

	// Select data for current time unit
	const timeUnitData = dashboardData.timeUnitData[timeUnit];
	const authorData = dashboardData.authorData;

	// Chart properties based on time unit
	const chartProps = {
		daily: {
			dataKey: "date",
			valueKey: "value",
			nameKey: "date",
			xAxisLabel: "Date",
		},
		weekly: {
			dataKey: "week",
			valueKey: "averageCycleTime",
			nameKey: "week",
			xAxisLabel: "Week",
		},
		monthly: {
			dataKey: "month",
			valueKey: "averageCycleTime",
			nameKey: "month",
			xAxisLabel: "Month",
		},
	}[timeUnit];

	return (
		<div className="p-6 max-w-6xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">Cycle Time Analysis Dashboard</h1>

			<div className="mb-6">
				<Button onClick={handleAskAI} disabled={aiLoading}>
					<Sparkles className="mr-2" />
					{aiLoading ? "分析中..." : "AIに聞く"}
				</Button>

				{aiError && (
					<div className="mt-2 p-4 bg-red-50 text-red-600 rounded">
						{aiError}
					</div>
				)}

				{aiSummary && (
					<div className="mt-2 p-4 bg-blue-50 text-blue-800 rounded">
						{aiSummary}
					</div>
				)}
			</div>

			{/* Time unit switch tabs */}
			<div className="flex mb-4 border-b">
				<button
					type="button"
					className={`py-2 px-4 ${timeUnit === "daily" ? "border-b-2 border-blue-500 font-medium" : "text-gray-500"}`}
					onClick={() => setTimeUnit("daily")}
				>
					Daily
				</button>
				<button
					type="button"
					className={`py-2 px-4 ${timeUnit === "weekly" ? "border-b-2 border-blue-500 font-medium" : "text-gray-500"}`}
					onClick={() => setTimeUnit("weekly")}
				>
					Weekly
				</button>
				<button
					type="button"
					className={`py-2 px-4 ${timeUnit === "monthly" ? "border-b-2 border-blue-500 font-medium" : "text-gray-500"}`}
					onClick={() => setTimeUnit("monthly")}
				>
					Monthly
				</button>
			</div>

			{/* Main chart: Cycle Time */}
			<div className="mb-8">
				<CycleTimeChart
					commits={commits}
					showMovingAverage={timeUnit === "daily"}
					showReferenceLine={true}
					referenceValue={24}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
				{/* Cycle time bar chart by time unit */}
				<div className="bg-white p-4 rounded shadow">
					<h2 className="text-lg font-semibold mb-4">
						{timeUnit === "daily"
							? "Daily"
							: timeUnit === "weekly"
								? "Weekly"
								: "Monthly"}
						Cycle Time
					</h2>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={timeUnitData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis
								dataKey={chartProps.dataKey}
								tick={{ fontSize: 12 }}
								label={{
									value: chartProps.xAxisLabel,
									position: "insideBottom",
									offset: -5,
								}}
							/>
							<YAxis
								label={{
									value: "Cycle Time (Hours)",
									angle: -90,
									position: "insideLeft",
								}}
								tick={{ fontSize: 12 }}
							/>
							<Tooltip
								formatter={(value) => [`${value} hours`, "Cycle Time"]}
							/>
							<Legend />
							<Bar
								dataKey={chartProps.valueKey}
								name="Cycle Time"
								fill="#8884d8"
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>

				{/* Author cycle time pie chart */}
				<div className="bg-white p-4 rounded shadow">
					<h2 className="text-lg font-semibold mb-4">
						Average Cycle Time by Developer
					</h2>
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={authorData}
								cx="50%"
								cy="50%"
								outerRadius={100}
								dataKey="averageCycleTime"
								nameKey="author"
								label={({ author, averageCycleTime }) =>
									`${author}: ${averageCycleTime.toFixed(1)}h`
								}
							>
								{authorData.map((_, index) => (
									<Cell
										key={`cell-${
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											index
										}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip
								formatter={(value) => [`${value} hours`, "Cycle Time"]}
							/>
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Commit count time series chart */}
			<div className="bg-white p-4 rounded shadow mb-8">
				<h2 className="text-lg font-semibold mb-4">
					{timeUnit === "daily"
						? "Daily"
						: timeUnit === "weekly"
							? "Weekly"
							: "Monthly"}
					Commit Count
				</h2>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={timeUnitData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey={chartProps.dataKey} tick={{ fontSize: 12 }} />
						<YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
						<Tooltip />
						<Legend />
						<Line
							type="monotone"
							dataKey="commitCount"
							name="Commit Count"
							stroke="#82ca9d"
							strokeWidth={2}
							dot={{ r: 3 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>

			<div className="text-sm text-gray-500 mt-4">
				* Cycle time is the elapsed time between consecutive commits, indicating
				development speed and efficiency.
			</div>
		</div>
	);
}
