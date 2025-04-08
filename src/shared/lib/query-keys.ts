import type { Organization, Profile } from "@/shared/schema";

export const queryKeys = {
	auth: {
		session: ["auth", "session"],
	},
	profile: {
		get: (profileId: Profile["id"] | undefined) => ["profile", profileId],
	},
	organization: {
		all: ["organization"],
		bySlug: (slug: Organization["slug"]) => ["organization", slug],
	} as const,
} as const;
