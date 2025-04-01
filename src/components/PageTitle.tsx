export function PageTitle({
	title,
	description,
}: { title: string; description?: string }) {
	return (
		<div className="mb-6">
			<h1 className="text-xl font-bold">{title}</h1>
			{description && (
				<p className="text-muted-foreground text-sm">{description}</p>
			)}
		</div>
	);
}
