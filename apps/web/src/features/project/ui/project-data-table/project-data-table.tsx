"use client";

import type { SelectProject } from "@nito/db";
import type { Column, ColumnDef } from "@tanstack/react-table";
import {
	CheckCircle2,
	Clock,
	type LucideIcon,
	MoreHorizontal,
	Text,
	XCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import * as React from "react";

import { useProjectStore } from "@/entities/project/model/project-store";
import { useDataTable } from "@/shared/hooks/use-data-table";
import type { Project } from "@/shared/schema";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { DataTable } from "@/shared/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header";
import { DataTableToolbar } from "@/shared/ui/data-table/data-table-toolbar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

type ProjectStatus = "active" | "inactive" | "draft";

const statusConfig: Record<
	ProjectStatus,
	{
		icon: LucideIcon;
		variant: "default" | "secondary" | "destructive";
	}
> = {
	active: { icon: CheckCircle2, variant: "default" },
	inactive: { icon: XCircle, variant: "destructive" },
	draft: { icon: Clock, variant: "secondary" },
};

const createColumns = ({
	pathname,
	setCurrentProject,
	onEdit,
	onDelete,
}: {
	pathname: string;
	setCurrentProject: (project: Project | null) => void;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
}): ColumnDef<SelectProject>[] => [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		size: 32,
		enableSorting: false,
		enableHiding: false,
	},
	{
		id: "name",
		accessorKey: "name",
		header: ({ column }: { column: Column<SelectProject, unknown> }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => {
			const selectProject = row.original;
			const project: Project = {
				id: selectProject.id,
				name: selectProject.name,
				description: selectProject.description,
				organization_id: selectProject.organizationId,
				created_at: selectProject.createdAt.toISOString(),
				updated_at: selectProject.updatedAt.toISOString(),
				is_active: true,
				status: "active",
			};

			return (
				<Link
					href={`${pathname}/projects/${project.name}`}
					onClick={() => setCurrentProject(project)}
					className="underline hover:cursor-pointer"
				>
					{project.name}
				</Link>
			);
		},
		meta: {
			label: "Name",
			placeholder: "Search project names...",
			variant: "text",
			icon: Text,
		},
		enableColumnFilter: true,
	},
	{
		id: "updatedAt",
		accessorKey: "updatedAt",
		header: ({ column }: { column: Column<SelectProject, unknown> }) => (
			<DataTableColumnHeader column={column} title="Last Updated" />
		),
		cell: ({ row }) => {
			const date = row.original.updatedAt;
			return <div>{date.toLocaleDateString()}</div>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon">
							<MoreHorizontal className="h-4 w-4" />
							<span className="sr-only">Open menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => onEdit(row.original.id)}>
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem
							variant="destructive"
							onClick={() => onDelete(row.original.id)}
						>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
		size: 32,
	},
];

type Props = {
	projects: SelectProject[];
};

export default function ProjectDataTable({ projects }: Props) {
	const t = useTranslations();
	const [name] = useQueryState("name", parseAsString.withDefault(""));

	const filteredData = React.useMemo(() => {
		return projects?.filter((project) => {
			const matchesName =
				name === "" || project.name.toLowerCase().includes(name.toLowerCase());
			return matchesName;
		});
	}, [name, projects]);

	const handleEdit = React.useCallback((id: string) => {
		console.log("Edit project:", id);
		// TODO: 編集画面への遷移処理
	}, []);

	const handleDelete = React.useCallback((id: string) => {
		console.log("Delete project:", id);
		// TODO: 削除の確認ダイアログと削除処理
	}, []);

	const pathname = usePathname();
	if (!pathname) {
		return <div>Pathname not found</div>;
	}

	const { setCurrentProject } = useProjectStore();

	const columns = React.useMemo(
		() =>
			createColumns({
				pathname,
				setCurrentProject,
				onEdit: handleEdit,
				onDelete: handleDelete,
			}),
		[pathname, setCurrentProject, handleEdit, handleDelete],
	);

	const { table } = useDataTable<SelectProject>({
		data: filteredData ?? [],
		columns,
		pageCount: 1,
		initialState: {
			sorting: [{ id: "updatedAt", desc: true }],
			columnPinning: { right: ["actions"] },
		},
		getRowId: (row) => row.id,
	});

	return (
		<DataTable table={table}>
			<DataTableToolbar table={table} />
		</DataTable>
	);
}
