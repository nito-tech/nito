import { sql } from "drizzle-orm";
import { authUsers } from "drizzle-orm/supabase";

import {
	type InsertOrganizations,
	type InsertProfiles,
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
 * Main seed function that populates the database with initial data
 */
async function main() {
	console.log("🌱 Starting seed process...");

	try {
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

		console.log("public.organizations");
		await db
			.insert(organizationsTable)
			.values(seedOrganizations)
			.onConflictDoUpdate({
				target: [organizationsTable.id],
				set: {
					name: sql`EXCLUDED.name`,
					slug: sql`EXCLUDED.slug`,
					description: sql`EXCLUDED.description`,
					avatarUrl: sql`EXCLUDED.avatar_url`,
				},
			});

		console.log("✨ Seed process completed!");
		process.exit(0);
	} catch (error) {
		console.error("❌ Error seeding database:", error);
		process.exit(1);
	}
}

main();
