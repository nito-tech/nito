"use client";

import { redirect, useParams } from "next/navigation";

import { useOrganizationBySlug } from "@/features/organizations/model/useOrganizations";
import type { Organization } from "@/shared/schema";

export default function DashboardOrganizationSlugPage() {
	const params = useParams();

	if (!params || !params.organizationSlug) {
		redirect("/not-found");
	}

	const { data: organization } = useOrganizationBySlug({
		slug: params.organizationSlug as Organization["slug"],
	});

	if (!organization) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-2xl font-bold mb-4">{organization.name}</h1>
			<p className="text-gray-600">{organization.description}</p>
		</div>
	);
}
