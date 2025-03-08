import Image from "next/image";

import { ConnectRepositoryCard } from "@/components/card/ConnectRepositoryCard";
import gitlabSvg from "@/components/icon/gitlab.svg";

/**
 * GitLab authentication card component.
 *
 * When the button is clicked, you will be redirected to GitLab and authenticated there.
 * If successful, you will be redirected to REDIRECT_URI.
 */
export function GitLabConnectRepositoryCard() {
	return (
		<ConnectRepositoryCard
			title="GitLab"
			description="Connect to your GitLab account to access repositories"
			iconImage={
				<Image
					src={gitlabSvg}
					alt="GitLab Icon"
					width={24}
					height={24}
					className="invert-0 dark:invert"
				/>
			}
			disabled
		/>
	);
}
