import Sidebar from "@/components/sidebar/Sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />

			<div className="flex-1 overflow-auto p-6">{children}</div>
		</div>
	);
}
