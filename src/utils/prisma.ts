import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

type PrismaGlobal = {
    prisma?: PrismaClient;
    pgPool?: Pool;
};

const globalForPrisma = globalThis as unknown as PrismaGlobal;
const isVercelProduction = process.env.VERCEL_ENV === "production";

function getPoolMax(): number {
    const raw = process.env.PG_POOL_MAX;
    const parsed = Number.parseInt(raw ?? "3", 10);

    if (!Number.isFinite(parsed) || parsed < 1) {
        return 3;
    }

    return parsed;
}

function createPool(): Pool {
    return new Pool({
        connectionString: process.env.DATABASE_URL,
        max: getPoolMax(),
        idleTimeoutMillis: 10_000,
        connectionTimeoutMillis: 5_000,
    });
}

function createClient(): PrismaClient {
    const pool = globalForPrisma.pgPool ?? createPool();

    if (!isVercelProduction) {
        globalForPrisma.pgPool = pool;
    }

    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (!isVercelProduction) {
    globalForPrisma.prisma = prisma;
}