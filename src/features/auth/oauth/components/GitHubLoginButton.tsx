import { Loader2 } from "lucide-react";
import Image from "next/image";

import githubSvg from "@/components/icon/github.svg";
import { Button } from "@/components/ui/button";

interface Props {
	onClick: () => void;
	isSubmitting: boolean;
	label: string;
}

/**
 * A button component for GitHub login
 */
export function GitHubLoginButton({ onClick, isSubmitting, label }: Props) {
	return (
		<Button onClick={onClick} disabled={isSubmitting} className="w-full">
			<Image
				src={githubSvg}
				alt="GitHub Icon"
				width={24}
				height={24}
				className="invert dark:invert-0"
			/>
			{/* Set minimum width to prevent button width from shrinking when showing loading icon */}
			<div className="flex flex-items-center justify-center min-w-[140px]">
				{isSubmitting ? (
					<Loader2 className="animate-spin" aria-label="Loading icon" />
				) : (
					label
				)}
			</div>
		</Button>
	);
}
