"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

import { useGetOrganizations } from "@/features/organizations/model/useOrganization";

export default function DashboardPage() {
	const { data: organizations } = useGetOrganizations({
		queryConfig: {
			select: (data) => data.organizations,
		},
	});

	useEffect(() => {
		if (organizations && organizations.length > 0) {
			redirect(`/dashboard/${organizations[0].slug}`);
		}
	}, [organizations]);

	return null;
}
