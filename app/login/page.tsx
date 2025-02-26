"use client";

import Image from "next/image";

import githubSvg from "@/components/icon/github.svg";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

async function signInWithGithub() {
	const { error } = await supabase.auth.signInWithOAuth({
		provider: "github",
	});

	if (error) {
		console.error("GitHub login error:", error);
	}
}

export default function LoginPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-3xl font-black mb-4">Login</h1>

			<Button onClick={signInWithGithub}>
				<Image src={githubSvg} alt="GitHub Icon" width={24} height={24} />
				Continue with GitHub
			</Button>
		</div>
	);
}
