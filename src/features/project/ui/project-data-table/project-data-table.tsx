"use client";

import type { Column, ColumnDef } from "@tanstack/react-table";
import {
	CheckCircle2,
	Clock,
	type LucideIcon,
	MoreHorizontal,
	PlayCircle,
	Text,
	XCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";

import { useDataTable } from "@/shared/hooks/use-data-table";
import type { Project } from "@/shared/schema";
import { Badge } from "@/shared/ui/badge";
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
	onEdit,
	onDelete,
}: {
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
}): ColumnDef<Project>[] => [
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
		header: ({ column }: { column: Column<Project, unknown> }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ cell }) => <div>{cell.getValue<Project["name"]>()}</div>,
		meta: {
			label: "Name",
			placeholder: "Search project names...",
			variant: "text",
			icon: Text,
		},
		enableColumnFilter: true,
	},
	{
		id: "status",
		accessorKey: "status",
		header: ({ column }: { column: Column<Project, unknown> }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ cell }) => {
			const status = cell.getValue<ProjectStatus>();
			const config = statusConfig[status];

			return (
				<Badge variant={config.variant} className="capitalize">
					<config.icon className="mr-1 h-3 w-3" />
					{status}
				</Badge>
			);
		},
		meta: {
			label: "Status",
			variant: "multiSelect",
			options: [
				{ label: "Active", value: "active", icon: PlayCircle },
				{ label: "Inactive", value: "inactive", icon: XCircle },
				{ label: "Draft", value: "draft", icon: Clock },
			],
		},
		enableColumnFilter: true,
	},
	{
		id: "updated_at",
		accessorKey: "updated_at",
		header: ({ column }: { column: Column<Project, unknown> }) => (
			<DataTableColumnHeader column={column} title="Last Updated" />
		),
		cell: ({ cell }) => {
			const date = new Date(cell.getValue<string>());
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
	projects: Project[];
};

export default function ProjectDataTable({ projects }: Props) {
	const t = useTranslations();

	const [name] = useQueryState("name", parseAsString.withDefault(""));
	const [status] = useQueryState(
		"status",
		parseAsArrayOf(parseAsString).withDefault([]),
	);

	const filteredData = useMemo(() => {
		return projects?.filter((project) => {
			const matchesName =
				name === "" || project.name.toLowerCase().includes(name.toLowerCase());
			const matchesStatus =
				status.length === 0 || status.includes(project.status);

			return matchesName && matchesStatus;
		});
	}, [name, status, projects]);

	const handleEdit = (id: string) => {
		console.log("Edit project:", id);
		// TODO: 編集画面への遷移処理
	};

	const handleDelete = (id: string) => {
		console.log("Delete project:", id);
		// TODO: 削除の確認ダイアログと削除処理
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const columns = useMemo(
		() => createColumns({ onEdit: handleEdit, onDelete: handleDelete }),
		[],
	);

	const { table } = useDataTable({
		data: filteredData ?? [],
		columns,
		pageCount: 1,
		initialState: {
			sorting: [{ id: "updated_at", desc: true }],
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
