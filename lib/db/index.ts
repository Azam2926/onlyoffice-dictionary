import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// This would typically come from environment variables
const url = process.env.DATABASE_URL || "postgres://postgres:mysecretpassword@localhost:5433/dictionary_db"

// Create postgres connection
const client = postgres(url)

// Create drizzle database instance
export const db = drizzle(client, { schema })

