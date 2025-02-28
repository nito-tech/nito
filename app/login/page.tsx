import { redirect } from "next/navigation";

import OauthLogin from "@/components/AuthForms/OauthLogin";
import { createServerClient } from "@/lib/supabase/server";

export default async function LoginPage() {
	const supabase = createServerClient();

	const {
		data: { session },
	} = await (await supabase).auth.getSession();

	if (session) {
		return redirect("/dashboard");
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-3xl font-black mb-4">Login</h1>
			<OauthLogin />
		</div>
	);
}
