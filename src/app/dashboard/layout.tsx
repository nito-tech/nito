import Sidebar from "@/entities/sidebar/ui/sidebar";
import Header from "@/widgets/header/ui/header";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col h-screen overflow-hidden">
			<Header />
			<div className="flex flex-1 overflow-hidden">
				<Sidebar />
				<main className="flex-1 overflow-auto p-6">{children}</main>
			</div>
		</div>
	);
}
