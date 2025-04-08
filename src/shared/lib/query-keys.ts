import type { Profile } from "@/shared/schema";

export const queryKeys = {
	auth: {
		session: ["auth", "session"],
	},
	profile: {
		get: (profileId: Profile["id"] | undefined) => ["profile", profileId],
	},
	organization: ["organization"],
} as const;
