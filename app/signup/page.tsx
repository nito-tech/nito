import Link from "next/link";

import EmailSignup from "./components/EmailSignup";

export default async function SignupPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<div className="w-72 flex flex-col items-center">
				<h1 className="text-3xl font-black mb-4">Signup</h1>

				<EmailSignup className="my-6 w-full" />

				<div className="w-full">
					<p>Already have an account?</p>
					<p>
						<Link
							href="/signin/password_signin"
							className="font-light text-sm underline"
						>
							Login with GitHub
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
