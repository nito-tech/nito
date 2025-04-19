import { defineConfig } from "drizzle-kit";

const postgresUrl = process.env.DATABASE_URL;

if (!postgresUrl) {
	throw new Error("DATABASE_URL is not set in .env");
}

export default defineConfig({
	dialect: "postgresql",
	out: "./supabase/migrations",
	schema: "./src/schema/*.ts",
	dbCredentials: {
		url: postgresUrl,
	},
	strict: false, // 一時的
	// introspect: {
	// 	casing: "camel",
	// },
	migrations: {
		prefix: "timestamp",
		table: "__drizzle_migrations__",
	},
	// strict: true,
	// verbose: true,
});
