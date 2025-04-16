import { sql } from "drizzle-orm";
import { authUsers } from "drizzle-orm/supabase";

import {
	type InsertOrganizations,
	type InsertProfiles,
	organizationMembersTable,
	organizationsTable,
	profilesTable,
} from "../schema";

import { db } from "..";

const seedAuthUsers = [
	{
		instance_id: "00000000-0000-0000-0000-000000000000",
		id: "00000000-0000-0000-0000-000000000001",
		aud: "authenticated",
		role: "authenticated",
		email: "nito.tech.official@gmail.com",
		encrypted_password: sql`crypt('Password123!', gen_salt('bf'))`,
		email_confirmed_at: new Date("2025-03-22T22:22:23.105643Z"),
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: new Date("2025-03-22T22:22:23.093826Z"),
		updated_at: new Date("2025-03-22T22:22:58.384429Z"),
		raw_user_meta_data: {
			username: "nito",
			display_name: "Nito Tech",
			avatar_url: "https://github.com/shadcn.png",
		},
	},
	{
		instance_id: "00000000-0000-0000-0000-000000000000",
		id: "00000000-0000-0000-0000-000000000002",
		aud: "authenticated",
		role: "authenticated",
		email: "saneatsu.wakana@gmail.com",
		encrypted_password: sql`crypt('Password123!', gen_salt('bf'))`,
		email_confirmed_at: new Date("2025-03-22T22:22:23.105643Z"),
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: new Date("2025-03-22T22:22:23.093826Z"),
		updated_at: new Date("2025-03-22T22:22:58.384429Z"),
		raw_user_meta_data: {
			username: "saneatsu",
			display_name: "Saneatsu Wakana",
			avatar_url: "https://github.com/shadcn.png",
		},
	},
	{
		instance_id: "00000000-0000-0000-0000-000000000000",
		id: "00000000-0000-0000-0000-000000000003",
		aud: "authenticated",
		role: "authenticated",
		email: "john.doe@example.com",
		encrypted_password: sql`crypt('Password123!', gen_salt('bf'))`,
		email_confirmed_at: new Date("2025-03-22T22:22:23.105643Z"),
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: new Date("2025-03-22T22:22:23.093826Z"),
		updated_at: new Date("2025-03-22T22:22:58.384429Z"),
		raw_user_meta_data: {
			username: "johndoe",
			display_name: "John Doe",
			avatar_url: "https://github.com/shadcn.png",
		},
	},
	{
		instance_id: "00000000-0000-0000-0000-000000000000",
		id: "00000000-0000-0000-0000-000000000004",
		aud: "authenticated",
		role: "authenticated",
		email: "jane.smith@example.com",
		encrypted_password: sql`crypt('Password123!', gen_salt('bf'))`,
		email_confirmed_at: new Date("2025-03-22T22:22:23.105643Z"),
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: new Date("2025-03-22T22:22:23.093826Z"),
		updated_at: new Date("2025-03-22T22:22:58.384429Z"),
		raw_user_meta_data: {
			username: "janesmith",
			display_name: "Jane Smith",
			avatar_url: "https://github.com/shadcn.png",
		},
	},
	{
		instance_id: "00000000-0000-0000-0000-000000000000",
		id: "00000000-0000-0000-0000-000000000005",
		aud: "authenticated",
		role: "authenticated",
		email: "mike.johnson@example.com",
		encrypted_password: sql`crypt('Password123!', gen_salt('bf'))`,
		email_confirmed_at: new Date("2025-03-22T22:22:23.105643Z"),
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: new Date("2025-03-22T22:22:23.093826Z"),
		updated_at: new Date("2025-03-22T22:22:58.384429Z"),
		raw_user_meta_data: {
			username: "mikej",
			display_name: "Mike Johnson",
			avatar_url: "https://github.com/shadcn.png",
		},
	},
	{
		instance_id: "00000000-0000-0000-0000-000000000000",
		id: "00000000-0000-0000-0000-000000000006",
		aud: "authenticated",
		role: "authenticated",
		email: "sarah.wilson@example.com",
		encrypted_password: sql`crypt('Password123!', gen_salt('bf'))`,
		email_confirmed_at: new Date("2025-03-22T22:22:23.105643Z"),
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: new Date("2025-03-22T22:22:23.093826Z"),
		updated_at: new Date("2025-03-22T22:22:58.384429Z"),
		raw_user_meta_data: {
			username: "sarahw",
			display_name: "Sarah Wilson",
			avatar_url: "https://github.com/shadcn.png",
		},
	},
	{
		instance_id: "00000000-0000-0000-0000-000000000000",
		id: "00000000-0000-0000-0000-000000000007",
		aud: "authenticated",
		role: "authenticated",
		email: "david.brown@example.com",
		encrypted_password: sql`crypt('Password123!', gen_salt('bf'))`,
		email_confirmed_at: new Date("2025-03-22T22:22:23.105643Z"),
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: new Date("2025-03-22T22:22:23.093826Z"),
		updated_at: new Date("2025-03-22T22:22:58.384429Z"),
		raw_user_meta_data: {
			username: "davidb",
			display_name: "David Brown",
			avatar_url: "https://github.com/shadcn.png",
		},
	},
	{
		instance_id: "00000000-0000-0000-0000-000000000000",
		id: "00000000-0000-0000-0000-000000000008",
		aud: "authenticated",
		role: "authenticated",
		email: "emily.davis@example.com",
		encrypted_password: sql`crypt('Password123!', gen_salt('bf'))`,
		email_confirmed_at: new Date("2025-03-22T22:22:23.105643Z"),
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: new Date("2025-03-22T22:22:23.093826Z"),
		updated_at: new Date("2025-03-22T22:22:58.384429Z"),
		raw_user_meta_data: {
			username: "emilyd",
			display_name: "Emily Davis",
			avatar_url: "https://github.com/shadcn.png",
		},
	},
	{
		instance_id: "00000000-0000-0000-0000-000000000000",
		id: "00000000-0000-0000-0000-000000000009",
		aud: "authenticated",
		role: "authenticated",
		email: "chris.taylor@example.com",
		encrypted_password: sql`crypt('Password123!', gen_salt('bf'))`,
		email_confirmed_at: new Date("2025-03-22T22:22:23.105643Z"),
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: new Date("2025-03-22T22:22:23.093826Z"),
		updated_at: new Date("2025-03-22T22:22:58.384429Z"),
		raw_user_meta_data: {
			username: "christ",
			display_name: "Chris Taylor",
			avatar_url: "https://github.com/shadcn.png",
		},
	},
	{
		instance_id: "00000000-0000-0000-0000-000000000000",
		id: "00000000-0000-0000-0000-000000000010",
		aud: "authenticated",
		role: "authenticated",
		email: "lisa.anderson@example.com",
		encrypted_password: sql`crypt('Password123!', gen_salt('bf'))`,
		email_confirmed_at: new Date("2025-03-22T22:22:23.105643Z"),
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: new Date("2025-03-22T22:22:23.093826Z"),
		updated_at: new Date("2025-03-22T22:22:58.384429Z"),
		raw_user_meta_data: {
			username: "lisaa",
			display_name: "Lisa Anderson",
			avatar_url: "https://github.com/shadcn.png",
		},
	},
];

const seedProfiles = [
	{
		id: "00000000-0000-0000-0000-000000000001",
		username: "nito",
		displayName: "Nito Tech",
		email: "nito.tech.official@gmail.com",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date("2025-03-22T22:22:23.093826Z"),
		updatedAt: new Date("2025-03-22T22:22:58.384429Z"),
	},
	{
		id: "00000000-0000-0000-0000-000000000002",
		username: "saneatsu",
		displayName: "Saneatsu Wakana",
		email: "saneatsu.wakana@gmail.com",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date("2025-03-22T22:22:23.093826Z"),
		updatedAt: new Date("2025-03-22T22:22:58.384429Z"),
	},
	{
		id: "00000000-0000-0000-0000-000000000003",
		username: "johndoe",
		displayName: "John Doe",
		email: "john.doe@example.com",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date("2025-03-22T22:22:23.093826Z"),
		updatedAt: new Date("2025-03-22T22:22:58.384429Z"),
	},
	{
		id: "00000000-0000-0000-0000-000000000004",
		username: "janesmith",
		displayName: "Jane Smith",
		email: "jane.smith@example.com",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date("2025-03-22T22:22:23.093826Z"),
		updatedAt: new Date("2025-03-22T22:22:58.384429Z"),
	},
	{
		id: "00000000-0000-0000-0000-000000000005",
		username: "mikej",
		displayName: "Mike Johnson",
		email: "mike.johnson@example.com",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date("2025-03-22T22:22:23.093826Z"),
		updatedAt: new Date("2025-03-22T22:22:58.384429Z"),
	},
	{
		id: "00000000-0000-0000-0000-000000000006",
		username: "sarahw",
		displayName: "Sarah Wilson",
		email: "sarah.wilson@example.com",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date("2025-03-22T22:22:23.093826Z"),
		updatedAt: new Date("2025-03-22T22:22:58.384429Z"),
	},
	{
		id: "00000000-0000-0000-0000-000000000007",
		username: "davidb",
		displayName: "David Brown",
		email: "david.brown@example.com",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date("2025-03-22T22:22:23.093826Z"),
		updatedAt: new Date("2025-03-22T22:22:58.384429Z"),
	},
	{
		id: "00000000-0000-0000-0000-000000000008",
		username: "emilyd",
		displayName: "Emily Davis",
		email: "emily.davis@example.com",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date("2025-03-22T22:22:23.093826Z"),
		updatedAt: new Date("2025-03-22T22:22:58.384429Z"),
	},
	{
		id: "00000000-0000-0000-0000-000000000009",
		username: "christ",
		displayName: "Chris Taylor",
		email: "chris.taylor@example.com",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date("2025-03-22T22:22:23.093826Z"),
		updatedAt: new Date("2025-03-22T22:22:58.384429Z"),
	},
	{
		id: "00000000-0000-0000-0000-000000000010",
		username: "lisaa",
		displayName: "Lisa Anderson",
		email: "lisa.anderson@example.com",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date("2025-03-22T22:22:23.093826Z"),
		updatedAt: new Date("2025-03-22T22:22:58.384429Z"),
	},
] as const satisfies InsertProfiles[];

const seedOrganizations = [
	{
		id: crypto.randomUUID(),
		name: "Nito",
		slug: "nito",
		description: "Nito",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "Apple Inc",
		slug: "apple",
		description: "Think Different",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "Microsoft Corporation",
		slug: "microsoft",
		description:
			"Empowering every person and every organization on the planet to achieve more",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "Google LLC",
		slug: "google",
		description: "Don't be evil",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "Amazon Inc",
		slug: "amazon",
		description: "Work hard, have fun, make history",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "Meta Platforms Inc",
		slug: "meta",
		description: "Connect with friends and the world around you on Facebook",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "Netflix Inc",
		slug: "netflix",
		description: "See what's next",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "Tesla Inc",
		slug: "tesla",
		description: "Accelerate the world's transition to sustainable energy",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "NVIDIA Corporation",
		slug: "nvidia",
		description: "The pioneer of GPU-accelerated computing",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "Adobe Inc",
		slug: "adobe",
		description: "Creativity for all",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "Salesforce Inc",
		slug: "salesforce",
		description: "We bring companies and customers together",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "Intel Corporation",
		slug: "intel",
		description: "Intel inside",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "AMD Inc",
		slug: "amd",
		description: "The future of computing",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "Oracle Corporation",
		slug: "oracle",
		description: "Oracle Cloud Infrastructure",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "IBM Corporation",
		slug: "ibm",
		description: "Let's put smart to work",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "Cisco Systems Inc",
		slug: "cisco",
		description: "The bridge to possible",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "Qualcomm Inc",
		slug: "qualcomm",
		description: "Inventing the technology the world loves",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "Samsung Electronics",
		slug: "samsung",
		description: "Do what you can't",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "Sony Group Corporation",
		slug: "sony",
		description: "Make. Believe",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "Dell Technologies",
		slug: "dell",
		description: "The power to do more",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: crypto.randomUUID(),
		name: "HP Inc",
		slug: "hp",
		description: "Keep reinventing",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
] satisfies InsertOrganizations[];

/**
 * Dynamically create organization members from seed profiles and organizations
 * This creates a random distribution of members across organizations
 */
const seedOrganizationMembers = (() => {
	const members: Array<{
		id: string;
		organizationId: string;
		profileId: string;
		// userId: string;
		role: "OWNER" | "DEVELOPER" | "BILLING" | "VIEWER";
		createdAt: Date;
		updatedAt: Date;
	}> = [];

	// For each organization, assign some random members
	for (const org of seedOrganizations) {
		// Always assign the first profile as OWNER
		members.push({
			id: crypto.randomUUID(),
			organizationId: org.id,
			profileId: seedProfiles[0].id,
			// userId: seedProfiles[0].id,
			role: "OWNER",
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		// Randomly assign other profiles to the organization
		// Skip the first profile as it's already assigned as OWNER
		const shuffledProfiles = [...seedProfiles.slice(1)].sort(
			() => Math.random() - 0.5,
		);

		// Assign 1-3 random members to each organization
		const numMembers = Math.floor(Math.random() * 3) + 1;
		const selectedProfiles = shuffledProfiles.slice(0, numMembers);

		for (const profile of selectedProfiles) {
			// Randomly assign a role
			const roles: Array<"OWNER" | "DEVELOPER" | "BILLING" | "VIEWER"> = [
				"DEVELOPER",
				"BILLING",
				"VIEWER",
			];
			const randomRole = roles[Math.floor(Math.random() * roles.length)];

			members.push({
				id: crypto.randomUUID(),
				organizationId: org.id,
				profileId: profile.id,
				// userId: profile.id,
				role: randomRole,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}
	}

	return members;
})();

/**
 * Main seed function that populates the database with initial data
 */
async function main() {
	console.log("🌱 Starting seed process...");

	try {
		// ----------------------------------------------
		// auth.users
		// ----------------------------------------------
		console.log("auth.users");
		await db
			.insert(authUsers)
			.values(seedAuthUsers)
			.onConflictDoUpdate({
				target: [authUsers.id],
				set: { email: sql`EXCLUDED.email` },
			});

		console.log("public.profiles");
		await db
			.insert(profilesTable)
			.values(seedProfiles)
			.onConflictDoUpdate({
				target: [profilesTable.id],
				set: { email: sql`EXCLUDED.email` },
			});

		// ----------------------------------------------
		// public.organizations
		// ----------------------------------------------
		console.log("public.organizations");

		// Get existing organizations
		const existingOrganizations = await db.select().from(organizationsTable);
		const existingSlugs = new Set(existingOrganizations.map((org) => org.slug));

		// Filter only organizations with non-overlapping slugs
		const filteredOrganizations = seedOrganizations.filter(
			(org) => !existingSlugs.has(org.slug),
		);

		if (filteredOrganizations.length > 0) {
			await db
				.insert(organizationsTable)
				.values(filteredOrganizations)
				.onConflictDoUpdate({
					target: [organizationsTable.id],
					set: {
						name: sql`EXCLUDED.name`,
						description: sql`EXCLUDED.description`,
						avatarUrl: sql`EXCLUDED.avatar_url`,
					},
				});
		}

		// ----------------------------------------------
		// public.organization_members
		// ----------------------------------------------
		console.log("public.organization_members");

		// Get existing organization members
		const existingOrganizationMembers = await db
			.select()
			.from(organizationMembersTable);
		const existingOrganizationMembersByProfileId = new Set(
			existingOrganizationMembers.map((member) => member.profileId),
		);

		// Filter only organization members with non-overlapping profileIds
		const filteredOrganizationMembers = seedOrganizationMembers.filter(
			(member) => !existingOrganizationMembersByProfileId.has(member.profileId),
		);

		if (filteredOrganizationMembers.length > 0) {
			await db
				.insert(organizationMembersTable)
				.values(filteredOrganizationMembers)
				.onConflictDoUpdate({
					target: [organizationMembersTable.id],
					set: {
						role: sql`EXCLUDED.role`,
					},
				});
		}

		console.log("✨ Seed process completed!");
		process.exit(0);
	} catch (error) {
		console.error("❌ Error seeding database:", error);
		process.exit(1);
	}
}

main();
