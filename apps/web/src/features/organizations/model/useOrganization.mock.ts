import type { SelectOrganization } from "@nito/db";

export const mockOrganizations: SelectOrganization[] = [
	{
		id: "00000000-0000-0000-0000-000000000001",
		name: "Nito",
		slug: "nito",
		createdAt: new Date("2024-01-01T00:00:00Z"),
		updatedAt: new Date("2024-01-01T00:00:00Z"),
		description: "Nito is a platform for managing organizations",
		avatarUrl: "https://nito.com/logo.png",
	},
	{
		id: "00000000-0000-0000-0000-000000000002",
		name: "Acme Corp",
		slug: "acme-corp",
		createdAt: new Date("2024-01-02T00:00:00Z"),
		updatedAt: new Date("2024-01-02T00:00:00Z"),
		description: "Acme Corp is a platform for managing organizations",
		avatarUrl: "https://acme.com/logo.png",
	},
];

export const useGetOrganizations = () => ({
	data: mockOrganizations,
	isLoading: false,
	error: null,
});
