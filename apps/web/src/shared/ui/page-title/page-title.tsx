import { cn } from "@/shared/utils/cn";

type Props = {
	title: string;
	description?: string;
	className?: string;
};

export function PageTitle({ title, description, className }: Props) {
	return (
		<div className={cn("space-y-2 mb-6", className)}>
			<h1 className="text-3xl font-bold">{title}</h1>
			{description && <p className="text-muted-foreground">{description}</p>}
		</div>
	);
}
