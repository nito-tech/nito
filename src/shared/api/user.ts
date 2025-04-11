"use server";

import type { User } from "@supabase/supabase-js";

import { createServerClient } from "@/shared/lib/supabase/server";
import { redirect } from "next/navigation";

export const getUser = async (): Promise<User> => {
	const supabase = await createServerClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error) {
		throw error;
	}

	if (!user) {
		redirect("/login");
	}

	return user;
};
