"use client";

import { Check, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";

import { useOrganizationStore } from "@/entities/organization/model/organization-store";
import { useProjectStore } from "@/entities/project/model/project-store";
import type { Project } from "@/shared/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSub,
} from "@/shared/ui/dropdown-menu";

// FIXME: Mock not working in Storybook.
import { useGetProjects } from "../../model/useProject";

export function ProjectSelector() {
	const t = useTranslations();
	const { currentOrganization } = useOrganizationStore();
	const { data: projects } = useGetProjects({
		organizationId: currentOrganization?.id ?? "",
	});
	const { currentProject, setCurrentProject } = useProjectStore();

	const router = useRouter();
	function handleProjectClick(project: Project) {
		setCurrentProject(project);
		router.push(`/dashboard/${currentOrganization?.slug}/${project.name}`);
	}

	return (
		<DropdownMenuGroup className="w-64">
			{/* <DropdownMenuSub>
				<div className="p-2">
					<Input
						placeholder={t("Organization.findOrganization")}
						className="bg-transparent text-sm rounded-md block w-full pl-10 p-2.5"
					/>
				</div>
			</DropdownMenuSub>

			<DropdownMenuSeparator /> */}

			<DropdownMenuSub>
				<DropdownMenuLabel className="text-muted-foreground">
					Projects
				</DropdownMenuLabel>
			</DropdownMenuSub>

			<DropdownMenuSub>
				{!projects || projects.length === 0 ? (
					<DropdownMenuItem className="text-muted-foreground">
						{t("Project.noProjects")}
					</DropdownMenuItem>
				) : (
					projects.map((project) => (
						<DropdownMenuItem
							key={project.id}
							className="px-2 py-1 focus:bg-transparent"
						>
							<Button
								variant="ghost"
								className="w-full px-2 py-5 justify-between"
								onClick={() => handleProjectClick(project)}
							>
								<div className="flex items-center gap-2">
									<Avatar className="h-8 w-8">
										{/* FIXME: {project.logo_url} */}
										<AvatarImage src="" alt={`${project.name} logo`} />
										<AvatarFallback>
											{project.name.substring(0, 2).toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<span className="text-foreground">{project.name}</span>
								</div>
								<div>
									{currentProject?.id === project.id && (
										<Check className="h-4 w-4" />
									)}
								</div>
							</Button>
						</DropdownMenuItem>
					))
				)}
			</DropdownMenuSub>

			<DropdownMenuItem className="focus:bg-transparent">
				<Button
					variant="outline"
					className="w-full bg-primary-foreground"
					onClick={() => {
						router.push("/dashboard/new-organization");
					}}
				>
					<Plus className="h-4 w-4" />
					<span>Create Project</span>
				</Button>
			</DropdownMenuItem>
		</DropdownMenuGroup>
	);
}
