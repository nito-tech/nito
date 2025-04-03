import React from "react";

import { ExternalLink, GitBranch, HelpCircle } from "lucide-react";

export default function Header() {
	return (
		<header className="h-14 border-b border-border flex items-center justify-between px-4 bg-background sticky top-0 z-50">
			{/* Left section: Logo and project selector */}
			<div className="flex items-center space-x-4">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 bg-emerald-500 rounded-md flex items-center justify-center flex-shrink-0 text-white">
						{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
						<svg
							viewBox="0 0 24 24"
							width="20"
							height="20"
							stroke="currentColor"
							strokeWidth="2"
							fill="none"
						>
							<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
						</svg>
					</div>
					<span className="font-bold">Nito</span>
					<span className="text-xs px-2 py-0.5 bg-muted rounded text-muted-foreground">
						Free
					</span>
				</div>

				<div className="h-6 border-r border-border" />

				<div className="flex items-center gap-2">
					<span className="font-medium text-sm">nito</span>
					<ExternalLink className="h-4 w-4 text-muted-foreground" />
				</div>

				<div className="h-6 border-r border-border" />

				<div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted cursor-pointer">
					<GitBranch className="h-4 w-4 text-muted-foreground" />
					<span className="text-sm">Enable branching</span>
				</div>
			</div>

			{/* Right section: Actions */}
			<div className="flex items-center space-x-2">
				<div className="w-8 h-8 rounded flex items-center justify-center bg-gradient-to-br from-emerald-400 to-blue-500 text-white font-medium">
					N
				</div>
			</div>
		</header>
	);
}
