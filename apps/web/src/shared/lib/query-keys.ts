import type {
	SelectOrganization,
	SelectProfile,
	SelectProject,
} from "@nito/db";

export const queryKeys = {
	auth: {
		session: ["auth", "session"],
	},
	profile: {
		get: (profileId: SelectProfile["id"] | undefined) => ["profile", profileId],
	},
	organization: {
		all: ["organizations"] as const,
		bySlug: (slug: SelectOrganization["slug"]) =>
			["organizations", slug] as const,
		members: (id: SelectOrganization["id"]) =>
			["organizations", id, "members"] as const,
	} as const,
	project: {
		all: (organizationSlug: SelectOrganization["slug"]) =>
			[organizationSlug, "projects"] as const,
		byName: (
			organizationSlug: SelectOrganization["slug"],
			name: SelectProject["name"],
		) => [organizationSlug, "projects", name] as const,
		members: (id: SelectProject["id"]) => ["projects", id, "members"] as const,
	} as const,
} as const;
