"use client";

import { useTranslations } from "next-intl";

import { CreateOrganizationForm } from "@/features/organization-create/ui/create-organization-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export default function NewOrganizationPage() {
	const t = useTranslations("Organization");

	return (
		<div className="container mx-auto py-10">
			<Card>
				<CardHeader>
					<CardTitle>{t("create.organization")}</CardTitle>
				</CardHeader>
				<CardContent>
					<CreateOrganizationForm />
				</CardContent>
			</Card>
		</div>
	);
}
