import type { Organization, Profile, Project } from "@/shared/schema";

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
	project: {
		all: ["project"],
		byName: (name: Project["name"]) => ["project", name],
	} as const,
} as const;
