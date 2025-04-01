import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Schema validation at build
import "@/config/env";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	serverExternalPackages: ["@mastra/*"],
	devIndicators: {
		position: "bottom-left",
	},
};

export default withNextIntl(nextConfig);
