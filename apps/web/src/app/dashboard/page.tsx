"use client";

import { useOrganizationStore } from "@/entities/organization/model/organization-store";
import { redirect } from "next/navigation";

export default function DashboardPage() {
	const { currentOrganization } = useOrganizationStore();

	if (!currentOrganization) {
		redirect("/login");
	}

	redirect(`/dashboard/${currentOrganization.slug}`);
}
