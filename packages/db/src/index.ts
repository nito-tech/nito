import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Load environment variables from .env file
dotenv.config();

import * as schema from "./schema";

const postgresUrl = process.env.DATABASE_URL;

if (!postgresUrl) {
	throw new Error("DATABASE_URL is not set in .env");
}

const client = postgres(postgresUrl);

export const db = drizzle(client, { schema });

export * from "./schema";
