import type { User } from "@supabase/supabase-js";

export const mockUser: User = {
	id: "00000000-0000-0000-0000-000000000001",
	email: "test@example.com",
	app_metadata: {},
	user_metadata: {},
	aud: "authenticated",
	created_at: "2021-01-01T00:00:00Z",
};

export const useRequiredAuth = () => ({
	user: mockUser,
});
