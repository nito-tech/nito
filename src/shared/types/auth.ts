import type { Session, User } from "@supabase/supabase-js";

export type AuthState = {
	user: User | null;
	session: Session | null;
	isLoading: boolean;
	logOut: () => Promise<void>;
	error: Error | null;
};
