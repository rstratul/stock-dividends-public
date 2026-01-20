import { createClient, type RedisClientType } from "redis";

let client: RedisClientType | null = null;

const getRedisUrl = (): string | null => {
  if (typeof process.env.REDIS_URL === "string" && process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }
  return null;
};

export const getRedisClient = async (): Promise<RedisClientType | null> => {
  if (client) {
    return client;
  }
  const url = getRedisUrl();
  if (!url) {
    return null;
  }
  client = createClient({ url });
  client.on("error", () => {
    // Prevent unhandled errors from crashing the app.
  });
  await client.connect();
  return client;
};

export const getCachedJson = async <T>(
  key: string,
): Promise<T | null> => {
  const redis = await getRedisClient();
  if (!redis) {
    return null;
  }
  const value = await redis.get(key);
  if (!value) {
    return null;
  }
  return JSON.parse(value) as T;
};

export const setCachedJson = async (
  key: string,
  value: unknown,
  ttlSeconds: number,
): Promise<void> => {
  const redis = await getRedisClient();
  if (!redis) {
    return;
  }
  await redis.set(key, JSON.stringify(value), { EX: ttlSeconds });
};
