"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useProjectStore } from "@/entities/project/model/project-store";
import { ProjectNameField } from "@/entities/project/ui/project-name-field/project-name-field";
import {
	type CreateProjectInput,
	CreateProjectSchema,
} from "@/features/project/model/create-project-schema";
import { useCreateProject } from "@/features/project/model/useProject";
import { queryKeys } from "@/shared/lib/query-keys";
import type { Organization } from "@/shared/schema";
import { Button } from "@/shared/ui/button";
import { Form } from "@/shared/ui/form";

export function CreateProjectForm({
	organization,
}: { organization: Organization }) {
	const t = useTranslations();
	const router = useRouter();
	const queryClient = useQueryClient();

	const { setCurrentProject } = useProjectStore();

	const { mutate: createProject, isPending } = useCreateProject({
		organizationId: organization.id,
		queryConfig: {
			onSuccess: (project) => {
				toast.success(t("Project.create.projectConfirm"));
				setCurrentProject(project);
				queryClient.invalidateQueries({
					queryKey: queryKeys.project.all(organization.slug),
				});
				router.push(`/dashboard/${organization.slug}/projects/${project.name}`);
			},
			onError: (error) => {
				toast.error(t("Error.mutationError", { message: error.message }));
			},
		},
	});

	return (
		<Form
			schema={CreateProjectSchema(t)}
			onSubmit={(data: CreateProjectInput) => createProject(data.name)}
			aria-label={t("Project.create.project")}
		>
			{() => (
				<>
					<ProjectNameField
						name="name"
						label={t("Project.name")}
						disabled={isPending}
					/>
					<Button type="submit" disabled={isPending}>
						{t("Project.create.project")}
					</Button>
				</>
			)}
		</Form>
	);
}
