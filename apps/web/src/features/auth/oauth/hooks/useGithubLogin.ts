import { useState } from "react";
import { toast } from "sonner";

import { logInWithOAuth } from "../actions";

/**
 * A custom hook for handling GitHub login
 */
export function useGithubLogin() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const signInWithGithub = async () => {
		if (process.env.NODE_ENV === "development") {
			toast.warning("Not implemented in the local environment", {
				description: "Please login with your Email and Password",
				duration: 8000,
			});
			return;
		}

		try {
			setIsSubmitting(true);
			const url = await logInWithOAuth("github");
			window.location.href = url;
		} catch (error) {
			console.error("GitHub login error:", error);
			toast.error("Failed to login with GitHub", {
				description: "Please try again later",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		isSubmitting,
		signInWithGithub,
	};
}
