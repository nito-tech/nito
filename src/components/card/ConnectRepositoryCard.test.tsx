import "@testing-library/jest-dom/vitest"; // Fix type error
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

import { ConnectRepositoryCard } from "./ConnectRepositoryCard";

vi.mock("next-intl", () => ({
	useTranslations: () => {
		return (key: string): string => {
			const translations: Record<string, string> = {
				connectToRepository: "Connect to repository",
				commingSoon: "Coming soon",
			};
			return translations[key] || key;
		};
	},
}));

afterEach(() => {
	cleanup();
	vi.clearAllMocks();
});

const defaultProps = {
	title: "GitHub",
	description: "Connect to your GitHub repository",
	iconImage: <svg data-testid="mock-icon" />,
	disabled: false,
};

describe("Unit", () => {
	test("renders with correct title and description", () => {
		render(<ConnectRepositoryCard {...defaultProps} />);

		expect(screen.getByText("GitHub")).toBeInTheDocument();
		expect(
			screen.getByText("Connect to your GitHub repository"),
		).toBeInTheDocument();
		expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
	});

	test("renders with Connect button when not disabled", () => {
		render(<ConnectRepositoryCard {...defaultProps} />);

		const button = screen.getByRole("button", {
			name: "Connect to repository",
		});
		expect(button).toBeInTheDocument();
		expect(button).not.toBeDisabled();
	});

	test("renders with Coming Soon button when disabled", () => {
		render(<ConnectRepositoryCard {...defaultProps} disabled={true} />);

		const button = screen.getByRole("button", { name: "Coming soon" });
		expect(button).toBeInTheDocument();
		expect(button).toBeDisabled();
	});

	test("applies opacity class when disabled", () => {
		const { container } = render(
			<ConnectRepositoryCard {...defaultProps} disabled={true} />,
		);

		const cardDiv = container.firstChild as HTMLElement;
		expect(cardDiv.className).toContain("opacity-70");
	});

	test("calls onClick when button is clicked", () => {
		const onClick = vi.fn();
		render(<ConnectRepositoryCard {...defaultProps} onClick={onClick} />);

		const button = screen.getByRole("button", {
			name: "Connect to repository",
		});
		fireEvent.click(button);

		expect(onClick).toHaveBeenCalledTimes(1);
	});

	test("does not call onClick when disabled button is clicked", () => {
		const onClick = vi.fn();
		render(
			<ConnectRepositoryCard
				{...defaultProps}
				disabled={true}
				onClick={onClick}
			/>,
		);

		const button = screen.getByRole("button", { name: "Coming soon" });
		fireEvent.click(button);

		expect(onClick).not.toHaveBeenCalled();
	});
});

describe("Integration", () => {
	test("works correctly with parent components", () => {
		// Integration tests test the integration of ConnectRepositoryCard with other components
		const mockParentAction = vi.fn();

		// Rendering to mimic parent components
		render(
			<div data-testid="mock-parent">
				<ConnectRepositoryCard
					title="GitLab"
					description="Connect to your GitLab repository"
					iconImage={<svg data-testid="gitlab-icon" />}
					disabled={false}
					onClick={mockParentAction}
				/>
			</div>,
		);

		// Test the linkage between parent and child components
		const button = screen.getByRole("button", {
			name: "Connect to repository",
		});
		fireEvent.click(button);

		expect(mockParentAction).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId("mock-parent")).toContainElement(button);
	});

	test("handles dynamic props changes correctly", () => {
		const { rerender } = render(
			<ConnectRepositoryCard
				title="GitHub"
				description="Connect to your GitHub repository"
				iconImage={<svg data-testid="github-icon" />}
				disabled={false}
				onClick={vi.fn()}
			/>,
		);

		expect(screen.getByText("GitHub")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Connect to repository" }),
		).not.toBeDisabled();

		// 再Change state by re-rendering
		rerender(
			<ConnectRepositoryCard
				title="GitHub"
				description="Connect to your GitHub repository"
				iconImage={<svg data-testid="github-icon" />}
				disabled={true}
				onClick={vi.fn()}
			/>,
		);

		expect(screen.getByRole("button", { name: "Coming soon" })).toBeDisabled();
	});
});
