import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	test: {
		environment: "jsdom",
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			include: ["**/*.{ts,tsx}"],
			exclude: ["next.config.ts", "next-env.d.ts", "i18n/**/*.{ts,tsx}"],
		},
	},
});
