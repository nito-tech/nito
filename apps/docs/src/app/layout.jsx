import Image from "next/image";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";

// TODO: Commonize with apps/web
import githubSvg from "../../icon/github.svg";

export const metadata = {
	title: {
		template: "%s - Nito",
	},
	applicationName: "Nito",
	generator: "Next.js",
	appleWebApp: {
		title: "Nito Docs",
	},
	other: {
		"msapplication-TileImage": "/ms-icon-144x144.png",
		"msapplication-TileColor": "#fff",
	},
	twitter: {
		site: "https://nito.tech",
	},
};

export default async function RootLayout({ children }) {
	const navbar = (
		<Navbar
			logo={
				<div>
					<b>Nito Docs</b>{" "}
					<span style={{ opacity: "60%" }}>for Developers</span>
				</div>
			}
			chatIcon={
				<Image
					src={githubSvg}
					alt="GitHub Icon"
					width={24}
					height={24}
					className="invert dark:invert-0"
				/>
			}
			chatLink="https://github.com/nito-tech/nito"
		/>
	);
	const pageMap = await getPageMap();
	return (
		<html lang="en" dir="ltr" suppressHydrationWarning>
			<Head faviconGlyph="✦" />
			<body>
				<Layout
					// banner={<Banner storageKey="Nextra 2">Nextra 2 Alpha</Banner>}
					navbar={navbar}
					footer={<Footer>MIT {new Date().getFullYear()} © Nito.</Footer>}
					editLink="Edit this page on GitHub"
					docsRepositoryBase="https://github.com/nito-tech/nito/tree/main/apps/docs"
					sidebar={{ defaultMenuCollapseLevel: 1 }}
					pageMap={pageMap}
				>
					{children}
				</Layout>
			</body>
		</html>
	);
}
