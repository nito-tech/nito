import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/shared/config/env";

import { users } from "./schema/users";

async function main() {
	console.log("Drizzle: main");
	const client = postgres(env.DATABASE_URL); // , { prepare: false }
	const db = drizzle(client, { schema: { users } });
}

main();
