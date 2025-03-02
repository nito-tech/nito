import Link from "next/link";

import { Divider } from "@/components/Divider";
import EmailAuthForm from "@/components/form/EmailAuthForm";

import { loginWithEmail } from "./actions";
import OauthLogin from "./components/OauthLogin";

export default async function LoginPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<div className="w-72 flex flex-col items-center">
				<h1 className="text-3xl font-black mb-4">Login</h1>

				<EmailAuthForm
					type="login"
					onSubmit={loginWithEmail}
					className="my-6 w-full"
				/>

				<Divider className="px-1" />

				<OauthLogin className="my-6 w-full" />

				<div className="w-full">
					<p>
						<Link href="/signup" className="font-light text-sm underline">
							Don't have an account? Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
