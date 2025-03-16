import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Schema validation at build
import "@/env";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	serverExternalPackages: ["@mastra/*"],
	devIndicators: {
		position: "bottom-right",
	},
};

export default withNextIntl(nextConfig);
