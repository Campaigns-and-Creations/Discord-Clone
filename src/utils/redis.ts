import "server-only";

import Redis from "ioredis";

type RedisGlobal = {
  redisClient?: Redis;
};

const globalForRedis = globalThis as unknown as RedisGlobal;
const isProduction = process.env.NODE_ENV === "production";

function getRedisUrl(): string {
  const configured = process.env.REDIS_URL?.trim();

  if (configured) {
    return configured;
  }

  if (!isProduction) {
    return "redis://127.0.0.1:6379";
  }

  throw new Error("Missing required environment variable: REDIS_URL");
}

function createRedisClient(): Redis {
  return new Redis(getRedisUrl(), {
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: false,
  });
}

export function getRedisClient(): Redis {
  if (globalForRedis.redisClient) {
    return globalForRedis.redisClient;
  }

  const client = createRedisClient();

  if (!isProduction) {
    globalForRedis.redisClient = client;
  }

  return client;
}
