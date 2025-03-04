import { cn } from "@/lib/utils";

export function Divider({ className }: { className?: string }) {
	return (
		<div className={cn("w-full items-center my-2 px-1", className)}>
			<div className="border-t border-muted-foreground" />
		</div>
	);
}
