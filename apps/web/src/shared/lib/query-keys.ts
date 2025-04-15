import type { Organization, Profile, Project } from "@/shared/schema";

export const queryKeys = {
	auth: {
		session: ["auth", "session"],
	},
	profile: {
		get: (profileId: Profile["id"] | undefined) => ["profile", profileId],
	},
	organization: {
		all: ["organizations"] as const,
		bySlug: (slug: Organization["slug"]) => ["organizations", slug] as const,
		members: (id: Organization["id"]) =>
			["organizations", id, "members"] as const,
	} as const,
	project: {
		all: (organizationSlug: Organization["slug"]) =>
			[organizationSlug, "projects"] as const,
		byName: (organizationSlug: Organization["slug"], name: Project["name"]) =>
			[organizationSlug, "projects", name] as const,
		members: (id: Project["id"]) => ["projects", id, "members"] as const,
	} as const,
} as const;
