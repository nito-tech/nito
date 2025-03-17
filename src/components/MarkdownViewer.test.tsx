import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import { MarkdownViewer } from "./MarkdownViewer";

describe("MarkdownViewer", () => {
	afterEach(() => {
		cleanup();
	});

	test("renders without crashing", () => {
		const { container } = render(<MarkdownViewer content="" />);
		expect(container.firstChild).toBeInTheDocument();
	});

	test("applies correct CSS classes", () => {
		const { container } = render(<MarkdownViewer content="Test content" />);
		const rootElement = container.firstChild;
		expect(rootElement).toHaveClass("prose", "prose-sm");
	});

	test("renders plain text content correctly", () => {
		render(<MarkdownViewer content="Hello world" />);
		expect(screen.getByText("Hello world")).toBeInTheDocument();
	});

	test("renders markdown headings correctly", () => {
		render(
			<MarkdownViewer
				content="# Heading 1

## Heading 2"
			/>,
		);

		// Find elements by their role and heading level
		const heading1 = screen.getByRole("heading", { level: 1 });
		const heading2 = screen.getByRole("heading", { level: 2 });

		expect(heading1).toHaveTextContent("Heading 1");
		expect(heading2).toHaveTextContent("Heading 2");
	});

	test("renders markdown formatting correctly", () => {
		render(<MarkdownViewer content="**Bold text** and *italic text*" />);

		const boldElement = screen.getByText("Bold text");
		const italicElement = screen.getByText("italic text");

		expect(boldElement.tagName).toBe("STRONG");
		expect(italicElement.tagName).toBe("EM");
	});

	test("renders markdown links correctly", () => {
		render(<MarkdownViewer content="[Link text](https://example.com)" />);

		const linkElement = screen.getByText("Link text");
		expect(linkElement.tagName).toBe("A");
		expect(linkElement).toHaveAttribute("href", "https://example.com");
	});

	test("renders markdown lists correctly", () => {
		render(
			<MarkdownViewer
				content={`
- Item 1
- Item 2
- Item 3
      `}
			/>,
		);

		const listItems = screen.getAllByRole("listitem");
		expect(listItems).toHaveLength(3);
		expect(listItems[0]).toHaveTextContent("Item 1");
		expect(listItems[1]).toHaveTextContent("Item 2");
		expect(listItems[2]).toHaveTextContent("Item 3");
	});

	test("renders GitHub Flavored Markdown tables correctly", () => {
		render(
			<MarkdownViewer
				content={`
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
      `}
			/>,
		);

		// Check for table element
		const tableElement = screen.getByRole("table");
		expect(tableElement).toBeInTheDocument();

		// Check for table headers
		const headers = screen.getAllByRole("columnheader");
		expect(headers).toHaveLength(2);
		expect(headers[0]).toHaveTextContent("Header 1");
		expect(headers[1]).toHaveTextContent("Header 2");

		// Check for table cells
		const cells = screen.getAllByRole("cell");
		expect(cells).toHaveLength(4);
		expect(cells[0]).toHaveTextContent("Cell 1");
		expect(cells[1]).toHaveTextContent("Cell 2");
		expect(cells[2]).toHaveTextContent("Cell 3");
		expect(cells[3]).toHaveTextContent("Cell 4");
	});

	test("renders GitHub Flavored Markdown task lists correctly", () => {
		render(
			<MarkdownViewer
				content={`
- [ ] Unchecked task
- [x] Checked task
      `}
			/>,
		);

		// Check for list items
		const listItems = screen.getAllByRole("listitem");
		expect(listItems).toHaveLength(2);

		// Check for checkboxes
		const checkboxes = screen.getAllByRole("checkbox");
		expect(checkboxes).toHaveLength(2);

		// Check checkbox states
		expect(checkboxes[0]).not.toBeChecked();
		expect(checkboxes[1]).toBeChecked();
	});

	test("renders GitHub Flavored Markdown strikethrough correctly", () => {
		render(<MarkdownViewer content="~~Strikethrough text~~" />);

		const strikethroughElement = screen.getByText("Strikethrough text");
		expect(strikethroughElement.tagName).toBe("DEL");
	});

	test("renders code blocks correctly", () => {
		render(
			<MarkdownViewer
				content={`
\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`
      `}
			/>,
		);

		const codeElement = screen.getByText(/const hello = "world";/);
		expect(codeElement.closest("pre")).toBeInTheDocument();
		expect(codeElement.closest("code")).toBeInTheDocument();
	});

	test("renders inline code correctly", () => {
		render(<MarkdownViewer content="This is `inline code`" />);

		const codeElement = screen.getByText("inline code");
		expect(codeElement.tagName).toBe("CODE");
	});
});
