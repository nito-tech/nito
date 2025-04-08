"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useRequiredAuth } from "#shared/contexts/AuthContext";

// FIXME: Mock not working in Storybook.
import { useOrganizations } from "../../model/useOrganizations";

export function OrganizationSelector() {
	const t = useTranslations();
	const { user } = useRequiredAuth();
	const { data: organizations } = useOrganizations({ userId: user.id });

	return (
		<div className="w-64 border-r border-border">
			<div className="p-3 border-b border-border">
				<Input
					placeholder={t("Organization.findOrganization")}
					className="bg-transparent text-sm rounded-md block w-full pl-10 p-2.5"
				/>
			</div>

			<div className="p-3 text-sm">
				<div className="text-sm text-muted-foreground mb-3">Organizations</div>
				<div className="space-y-2">
					{!organizations || organizations.length === 0 ? (
						<div className="text-muted-foreground">
							{t("Organization.noOrganizations")}
						</div>
					) : (
						organizations.map((organization) => (
							<div
								key={organization.id}
								className="flex items-center gap-2 rounded-md hover:bg-secondary cursor-pointer"
							>
								<Avatar className="h-8 w-8">
									{/* FIXME: {organization.logo_url} */}
									<AvatarImage src="" alt={`${organization.name} logo`} />
									<AvatarFallback>
										{organization.name.substring(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<span className="text-foreground">{organization.name}</span>
							</div>
						))
					)}
				</div>
				<Button
					variant="outline"
					className="w-full mt-3 bg-primary-foreground flex items-center justify-center gap-2 p-2 text-sm rounded-md border border-border"
				>
					<Plus className="h-4 w-4" />
					<span>Create Team</span>
				</Button>
			</div>
		</div>
	);
}
