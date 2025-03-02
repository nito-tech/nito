export function FormError({ message }: { message: string | undefined }) {
	return (
		<p role="alert" className="text-xs text-invalid">
			{message}
		</p>
	);
}
