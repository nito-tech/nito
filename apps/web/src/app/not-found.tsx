"use client";

import { Ghost, Home } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { paths } from "@/shared/config/paths";
import { Button } from "@/shared/ui/button";

export default function NotFoundPage() {
	const t = useTranslations("notFound");

	return (
		<div className="fixed inset-0 flex items-center justify-center">
			<div className="max-w-3xl w-full text-center space-y-6">
				<h1 className="text-9xl font-extrabold tracking-tighter text-primary relative inline-block">
					404
					<Ghost className="w-16 h-16 text-primary/70 absolute top-10 -right-18 animate-bounce" />
				</h1>

				<h2 className="text-2xl md:text-3xl font-bold mt-2">
					<span
						className="text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
						style={{ WebkitBackgroundClip: "text" }}
					>
						{t("title")}
					</span>
				</h2>

				<p className="text-muted-foreground max-w-xl mx-auto">
					{t("description")}
				</p>

				<div className="flex justify-center">
					<Link href={paths.app.root.getHref()}>
						<Button size="lg" className="px-8">
							<Home className="mr-2 h-5 w-5" />
							{t("goToHome")}
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
