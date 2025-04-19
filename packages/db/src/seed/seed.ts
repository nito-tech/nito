import { sql } from "drizzle-orm";

import {
	type InsertOrganization,
	type InsertOrganizationMember,
	type InsertProfile,
	type InsertProject,
	type InsertProjectMember,
	type SelectOrganization,
	type SelectOrganizationMember,
	type SelectProject,
	organizationMembersTable,
	organizationsTable,
	profilesTable,
	projectMembersTable,
	projectsTable,
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
		email_confirmed_at: "2025-03-22T22:22:23.105643Z",
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: "2025-03-22T22:22:23.093826Z",
		updated_at: "2025-03-22T22:22:58.384429Z",
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
		email_confirmed_at: "2025-03-22T22:22:23.105643Z",
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: "2025-03-22T22:22:23.093826Z",
		updated_at: "2025-03-22T22:22:58.384429Z",
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
		email_confirmed_at: "2025-03-22T22:22:23.105643Z",
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: "2025-03-22T22:22:23.093826Z",
		updated_at: "2025-03-22T22:22:58.384429Z",
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
		email_confirmed_at: "2025-03-22T22:22:23.105643Z",
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: "2025-03-22T22:22:23.093826Z",
		updated_at: "2025-03-22T22:22:58.384429Z",
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
		email_confirmed_at: "2025-03-22T22:22:23.105643Z",
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: "2025-03-22T22:22:23.093826Z",
		updated_at: "2025-03-22T22:22:58.384429Z",
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
		email_confirmed_at: "2025-03-22T22:22:23.105643Z",
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: "2025-03-22T22:22:23.093826Z",
		updated_at: "2025-03-22T22:22:58.384429Z",
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
		email_confirmed_at: "2025-03-22T22:22:23.105643Z",
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: "2025-03-22T22:22:23.093826Z",
		updated_at: "2025-03-22T22:22:58.384429Z",
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
		email_confirmed_at: "2025-03-22T22:22:23.105643Z",
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: "2025-03-22T22:22:23.093826Z",
		updated_at: "2025-03-22T22:22:58.384429Z",
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
		email_confirmed_at: "2025-03-22T22:22:23.105643Z",
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: "2025-03-22T22:22:23.093826Z",
		updated_at: "2025-03-22T22:22:58.384429Z",
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
		email_confirmed_at: "2025-03-22T22:22:23.105643Z",
		invited_at: null,
		confirmation_token: "",
		confirmation_sent_at: null,
		recovery_token: "",
		recovery_sent_at: null,
		email_change_token_new: "",
		email_change: "",
		email_change_sent_at: null,
		created_at: "2025-03-22T22:22:23.093826Z",
		updated_at: "2025-03-22T22:22:58.384429Z",
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
] as const satisfies InsertProfile[];

const seedOrganizations = [
	{
		id: "00000000-0000-0000-0000-000000000010",
		name: "Nito Inc",
		slug: "nito",
		description: "Nito",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000011",
		name: "Apple Inc",
		slug: "apple",
		description: "Think Different",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000012",
		name: "Microsoft Corporation",
		slug: "microsoft",
		description:
			"Empowering every person and every organization on the planet to achieve more",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000013",
		name: "Google LLC",
		slug: "google",
		description: "Don't be evil",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000014",
		name: "Amazon Inc",
		slug: "amazon",
		description: "Work hard, have fun, make history",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000015",
		name: "Meta Platforms Inc",
		slug: "meta",
		description: "Connect with friends and the world around you on Facebook",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000016",
		name: "Netflix Inc",
		slug: "netflix",
		description: "See what's next",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000017",
		name: "Tesla Inc",
		slug: "tesla",
		description: "Accelerate the world's transition to sustainable energy",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000018",
		name: "NVIDIA Corporation",
		slug: "nvidia",
		description: "The pioneer of GPU-accelerated computing",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000019",
		name: "Adobe Inc",
		slug: "adobe",
		description: "Creativity for all",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000020",
		name: "Salesforce Inc",
		slug: "salesforce",
		description: "We bring companies and customers together",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000021",
		name: "Intel Corporation",
		slug: "intel",
		description: "Intel inside",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000022",
		name: "AMD Inc",
		slug: "amd",
		description: "The future of computing",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000023",
		name: "Oracle Corporation",
		slug: "oracle",
		description: "Oracle Cloud Infrastructure",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000024",
		name: "IBM Corporation",
		slug: "ibm",
		description: "Let's put smart to work",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000025",
		name: "Cisco Systems Inc",
		slug: "cisco",
		description: "The bridge to possible",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000026",
		name: "Qualcomm Inc",
		slug: "qualcomm",
		description: "Inventing the technology the world loves",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000027",
		name: "Samsung Electronics",
		slug: "samsung",
		description: "Do what you can't",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000028",
		name: "Sony Group Corporation",
		slug: "sony",
		description: "Make. Believe",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000029",
		name: "Dell Technologies",
		slug: "dell",
		description: "The power to do more",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "00000000-0000-0000-0000-000000000030",
		name: "HP Inc",
		slug: "hp",
		description: "Keep reinventing",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
] satisfies InsertOrganization[];

/**
 * Creates organization members for each organization
 *
 * This function assigns profiles to organizations with the following rules:
 * 1. The first profile is always assigned as OWNER to each organization
 * 2. Additional profiles (1-3) are randomly assigned to each organization
 * 3. Each profile can only be assigned once to an organization (no duplicates)
 * 4. Roles are randomly assigned from OWNER, DEVELOPER, BILLING, or VIEWER
 *
 * The randomization is deterministic based on the SALT value and organization/profile IDs
 *
 * @param organizations - List of organizations to create members for
 * @returns Array of organization members to be inserted into the database
 */
const seedOrganizationMembers = (organizations: SelectOrganization[]) => {
	const members: InsertOrganizationMember[] = [];
	let memberIndex = 1;

	// For each organization, assign members in a deterministic way
	for (const org of organizations) {
		// Create a set to track which profiles have been assigned to this organization
		const assignedProfileIds = new Set<string>();

		// Always assign the first profile as OWNER
		members.push({
			id: `00000000-0000-0000-0000-${String(memberIndex).padStart(12, "0")}`,
			organizationId: org.id,
			profileId: seedProfiles[0].id,
			role: "OWNER",
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		memberIndex++;
		assignedProfileIds.add(seedProfiles[0].id);

		// Assign other profiles to the organization in a deterministic way
		// Skip the first profile as it's already assigned as OWNER
		const availableProfiles = seedProfiles
			.slice(1)
			.filter((profile) => !assignedProfileIds.has(profile.id));

		// Assign roles in a fixed order: DEVELOPER, BILLING, VIEWER
		const roles = ["DEVELOPER", "BILLING", "VIEWER"] as const;
		for (let i = 0; i < Math.min(availableProfiles.length, roles.length); i++) {
			const profile = availableProfiles[i];
			members.push({
				id: `00000000-0000-0000-0000-${String(memberIndex).padStart(12, "0")}`,
				organizationId: org.id,
				profileId: profile.id,
				role: roles[i],
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			memberIndex++;
			assignedProfileIds.add(profile.id);
		}
	}

	return members;
};

/**
 * Dynamically create projects for each organization
 * This creates a random distribution of projects across organizations
 */
const seedProjects = (organizations: SelectOrganization[]) => {
	const projects: InsertProject[] = [];
	let projectIndex = 1;

	// Project name prefixes for generating unique project names
	const projectPrefixes = [
		"core",
		"api",
		"web",
		"mobile",
		"backend",
		"frontend",
		"data",
		"analytics",
		"infra",
		"security",
		"auth",
		"payment",
		"notification",
		"messaging",
		"storage",
	];

	// For each organization, create a fixed number of projects
	for (const org of organizations) {
		// Always create 3 projects for each organization
		const numProjects = 3;

		// Use a fixed order of prefixes
		for (let i = 0; i < numProjects; i++) {
			// Generate a unique project name using organization slug and prefix
			const projectName = `${org.slug}-${projectPrefixes[i]}`.toLowerCase();

			// Create project with deterministic ID
			projects.push({
				id: `00000000-0000-0000-0000-${String(projectIndex).padStart(12, "0")}`,
				name: projectName,
				description: `${projectName} project for ${org.name}`,
				organizationId: org.id,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			projectIndex++;
		}
	}

	return projects;
};

/**
 * Dynamically create project members from projects
 * This creates a random distribution of members across projects
 * @param projects - List of projects to create members for
 */
const seedProjectMembers = (
	organizationMembers: SelectOrganizationMember[],
	projects: SelectProject[],
) => {
	const projectMembers: InsertProjectMember[] = [];
	let memberIndex = 1;

	// For each project, assign members in a deterministic way
	for (const project of projects) {
		// Get organization members for this project's organization
		const projectOrgMembers = organizationMembers.filter(
			(member) => member.organizationId === project.organizationId,
		);

		// Skip if no organization members found
		if (projectOrgMembers.length === 0) continue;

		// Always assign the first member as OWNER
		const firstMember = projectOrgMembers[0];
		projectMembers.push({
			id: `00000000-0000-0000-0000-${String(memberIndex).padStart(12, "0")}`,
			projectId: project.id,
			memberId: firstMember.id, // Use organization_member's id
			role: "OWNER",
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		memberIndex++;

		// Assign other members to the project in a deterministic way
		// Skip the first member as it's already assigned as OWNER
		const otherMembers = projectOrgMembers.slice(1);

		// Assign up to 2 other members with fixed roles
		const roles = ["EDITOR", "VIEWER"] as const;
		for (let i = 0; i < Math.min(otherMembers.length, roles.length); i++) {
			const member = otherMembers[i];
			projectMembers.push({
				id: `00000000-0000-0000-0000-${String(memberIndex).padStart(12, "0")}`,
				projectId: project.id,
				memberId: member.id,
				role: roles[i],
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			memberIndex++;
		}
	}

	return projectMembers;
};

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
		// authUsers in drizzle-orm/supabase does not have columns such as encrypted_password,
		// so execute SQL directly
		for (const user of seedAuthUsers) {
			await db.execute(sql`
				INSERT INTO auth.users (
					id, instance_id, aud, role, email, encrypted_password,
					email_confirmed_at, invited_at, confirmation_token,
					confirmation_sent_at, recovery_token, recovery_sent_at,
					email_change_token_new, email_change, email_change_sent_at,
					created_at, updated_at, raw_user_meta_data
				)
				VALUES (
					${user.id}, ${user.instance_id}, ${user.aud}, ${user.role}, ${user.email},
					crypt('Password123!', gen_salt('bf')),
					${user.email_confirmed_at},
					${(user.invited_at as Date | null)?.toISOString() ?? null},
					${user.confirmation_token},
					${(user.confirmation_sent_at as Date | null)?.toISOString() ?? null},
					${user.recovery_token},
					${(user.recovery_sent_at as Date | null)?.toISOString() ?? null},
					${user.email_change_token_new},
					${user.email_change},
					${(user.email_change_sent_at as Date | null)?.toISOString() ?? null},
					${user.created_at},
					${user.updated_at},
					${JSON.stringify(user.raw_user_meta_data)}
				)
				ON CONFLICT (id) DO UPDATE SET
					instance_id = EXCLUDED.instance_id
					-- aud = EXCLUDED.aud,
					-- role = EXCLUDED.role,
					-- email = EXCLUDED.email,
					-- encrypted_password = crypt('Password123!', gen_salt('bf')),
					-- email_confirmed_at = EXCLUDED.email_confirmed_at,
					-- invited_at = EXCLUDED.invited_at,
					-- confirmation_token = EXCLUDED.confirmation_token,
					-- confirmation_sent_at = EXCLUDED.confirmation_sent_at,
					-- recovery_token = EXCLUDED.recovery_token,
					-- recovery_sent_at = EXCLUDED.recovery_sent_at,
					-- email_change_token_new = EXCLUDED.email_change_token_new,
					-- email_change = EXCLUDED.email_change,
					-- email_change_sent_at = EXCLUDED.email_change_sent_at,
					-- created_at = EXCLUDED.created_at,
					-- updated_at = EXCLUDED.updated_at,
					-- raw_user_meta_data = EXCLUDED.raw_user_meta_data
			`);
		}

		// ----------------------------------------------
		// public.profiles
		// ----------------------------------------------
		console.log("public.profiles");
		await db
			.insert(profilesTable)
			.values(seedProfiles)
			.onConflictDoUpdate({
				target: [profilesTable.id],
				set: {
					username: sql`EXCLUDED.username`,
					displayName: sql`EXCLUDED.display_name`,
					email: sql`EXCLUDED.email`,
					avatarUrl: sql`EXCLUDED.avatar_url`,
					updatedAt: sql`EXCLUDED.updated_at`,
				},
			});

		// ----------------------------------------------
		// public.organizations
		// ----------------------------------------------
		console.log("public.organizations");

		await db
			.insert(organizationsTable)
			.values(seedOrganizations)
			.onConflictDoUpdate({
				target: [organizationsTable.slug],
				set: {
					name: sql`EXCLUDED.name`,
					description: sql`EXCLUDED.description`,
					avatarUrl: sql`EXCLUDED.avatar_url`,
				},
			});

		const organizations = await db.select().from(organizationsTable);

		// ----------------------------------------------
		// public.organization_members
		// ----------------------------------------------
		console.log("public.organization_members");

		await db
			.insert(organizationMembersTable)
			.values(seedOrganizationMembers(organizations))
			.onConflictDoUpdate({
				target: [organizationMembersTable.id],
				set: {
					role: sql`EXCLUDED.role`,
				},
			});

		// ----------------------------------------------
		// public.projects
		// ----------------------------------------------
		console.log("public.projects");

		await db
			.insert(projectsTable)
			.values(seedProjects(organizations))
			.onConflictDoUpdate({
				target: [projectsTable.id],
				set: {
					name: sql`EXCLUDED.name`,
					description: sql`EXCLUDED.description`,
					organizationId: sql`EXCLUDED.organization_id`,
					updatedAt: sql`EXCLUDED.updated_at`,
				},
			});

		const projects = await db.select().from(projectsTable);

		// ----------------------------------------------
		// public.project_members
		// ----------------------------------------------
		console.log("public.project_members");

		const organizationMembers = await db
			.select()
			.from(organizationMembersTable);
		const projectMembers = seedProjectMembers(organizationMembers, projects);

		await db
			.insert(projectMembersTable)
			.values(projectMembers)
			.onConflictDoUpdate({
				target: [projectMembersTable.id],
				set: {
					projectId: sql`EXCLUDED.project_id`,
					memberId: sql`EXCLUDED.member_id`,
					role: sql`EXCLUDED.role`,
					updatedAt: sql`EXCLUDED.updated_at`,
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
