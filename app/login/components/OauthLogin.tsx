"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import githubSvg from "@/components/icon/github.svg";
import { Button } from "@/components/ui/button";

import { loginWithOAuth } from "../actions";

interface Props {
	className?: string;
}

export default function OauthLogin({ className }: Props) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function signInWithGithub() {
		setIsSubmitting(true);

		try {
			const url = await loginWithOAuth("github");

			// router.push cannot be used to redirect to an external site.
			window.location.href = url;
		} catch (error) {
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
				<Image
					src={githubSvg}
					alt="GitHub Icon"
					width={24}
					height={24}
					className="invert dark:invert-0"
				/>
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
