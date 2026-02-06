import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.NEON_DATABASE_URL;

const sslEnabled =
  process.env.PGSSLMODE === "require" ||
  process.env.DATABASE_SSL === "true" ||
  /sslmode=require/i.test(connectionString || "") ||
  /ssl=true/i.test(connectionString || "");

const sslConfig = sslEnabled ? { rejectUnauthorized: false } : undefined;

const hasPgParams =
  process.env.PGHOST ||
  process.env.PGUSER ||
  process.env.PGDATABASE ||
  process.env.PGPORT ||
  process.env.PGPASSWORD;

if (!connectionString && !hasPgParams) {
  throw new Error(
    "Database config missing. Set DATABASE_URL (preferred) or PGHOST/PGUSER/PGDATABASE/PGPORT/PGPASSWORD.",
  );
}

const poolConfig = connectionString
  ? { connectionString, ssl: sslConfig }
  : {
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      port: process.env.PGPORT ? Number(process.env.PGPORT) : undefined,
      ssl: sslConfig,
    };

export const pool = new Pool(poolConfig);
export const db = drizzle(pool, { schema });
