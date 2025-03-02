"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import githubSvg from "@/components/icon/github.svg";
import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@/lib/supabase/client";
import { getSiteUrl } from "@/lib/utils";

const redirectPath = "/dashboard";

interface Props {
	className?: string;
}

export default function OauthLogin({ className }: Props) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function signInWithGithub() {
		setIsSubmitting(true);

		const supabase = createBrowserClient();
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: `${getSiteUrl("/auth/callback")}?next=${redirectPath}`,
			},
		});

		if (error) {
			console.error("GitHub login error:", error);
		}

		setIsSubmitting(false);
	}

	return (
		<div className={className}>
			<Button
				onClick={signInWithGithub}
				disabled={isSubmitting}
				className="w-full"
			>
				<Image src={githubSvg} alt="GitHub Icon" width={24} height={24} />
				<div className="flex flex-items-center justify-center">
					{isSubmitting ? (
						<Loader2 className="animate-spin" />
					) : (
						"Continue with GitHub"
					)}
				</div>
			</Button>
		</div>
	);
}
