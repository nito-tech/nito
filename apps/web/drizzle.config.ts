import { defineConfig } from "drizzle-kit";

import { env } from "@/shared/config/env";

export default defineConfig({
	dialect: "postgresql",
	out: "./db/migrations",
	schema: "./db/schema/*.ts",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	strict: false, // 一時的
	// introspect: {
	// 	casing: "camel",
	// },
	// migrations: {
	// 	prefix: "timestamp",
	// 	table: "__drizzle_migrations__",
	// },
	// strict: true,
	// verbose: true,
});
