"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import githubSvg from "@/components/icon/github.svg";
import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@/lib/supabase/client";

const redirectPath = "/dashboard";

export default function OauthLogin() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function signInWithGithub() {
		setIsSubmitting(true);

		const supabase = createBrowserClient();
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				// TODO: redirectTo は環境ごとに動的に変更する
				redirectTo: `http://localhost:3000/auth/callback?next=${redirectPath}`,
			},
		});

		if (error) {
			console.error("GitHub login error:", error);
		}

		setIsSubmitting(false);
	}

	return (
		<div>
			<Button onClick={signInWithGithub} disabled={isSubmitting}>
				<Image src={githubSvg} alt="GitHub Icon" width={24} height={24} />
				{isSubmitting ? (
					<Loader2 className="animate-spin" />
				) : (
					"Continue with GitHub"
				)}
			</Button>
		</div>
	);
}
