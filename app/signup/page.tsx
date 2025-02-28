import OauthLogin from "@/components/AuthForms/OauthLogin";

export default async function SignupPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-3xl font-black mb-4">Signup</h1>
			<OauthLogin />
		</div>
	);
}
