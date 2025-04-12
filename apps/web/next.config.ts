import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Schema validation at build
import "@/shared/config/env";

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts");

const nextConfig: NextConfig = {
	serverExternalPackages: ["@mastra/*"],
	devIndicators: {
		position: "bottom-left",
	},
};

export default withNextIntl(nextConfig);
