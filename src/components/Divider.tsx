import { cn } from "@/lib/utils";

export function Divider({ className }: { className?: string }) {
	return (
		<div className="w-full items-center my-2 px-1">
			<div className={cn("border-t border-muted-foreground", className)} />
		</div>
	);
}
