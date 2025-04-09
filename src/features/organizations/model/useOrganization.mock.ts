import type { Organization } from "@/shared/schema";

export const mockOrganizations: Organization[] = [
	{
		id: "00000000-0000-0000-0000-000000000001",
		name: "Nito",
		slug: "nito",
		created_at: "2024-01-01T00:00:00Z",
		updated_at: "2024-01-01T00:00:00Z",
		created_by: "00000000-0000-0000-0000-000000000001",
		description: "Nito is a platform for managing organizations",
		domain: "nito.com",
		is_active: true,
		logo_url: "https://nito.com/logo.png",
	},
	{
		id: "00000000-0000-0000-0000-000000000002",
		name: "Acme Corp",
		slug: "acme-corp",
		created_at: "2024-01-02T00:00:00Z",
		updated_at: "2024-01-02T00:00:00Z",
		created_by: "00000000-0000-0000-0000-000000000001",
		description: "Acme Corp is a platform for managing organizations",
		domain: "acme.com",
		is_active: true,
		logo_url: "https://acme.com/logo.png",
	},
];

export const useGetOrganizations = () => ({
	data: mockOrganizations,
	isLoading: false,
	error: null,
});
