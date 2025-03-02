import Link from "next/link";

import EmailAuthForm from "@/components/form/EmailAuthForm";

import { signupWithEmail } from "./actions";

export default async function SignupPage() {
	return (
		// Set minimum height to full viewport height minus header height
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
			<div className="w-72 flex flex-col items-center">
				<h1 className="text-3xl font-black mb-4">Signup</h1>

				<EmailAuthForm
					type="signup"
					onSubmit={signupWithEmail}
					className="my-6 w-full"
				/>

				<div className="w-full">
					<p>Already have an account?</p>
					<p>
						<Link
							href="/signin/password_signin"
							className="font-light text-sm underline"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
