import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	/* config options here */
	devIndicators: {
		position: "bottom-right",
	},
};

export default withNextIntl(nextConfig);
