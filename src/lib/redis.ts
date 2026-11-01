import { Redis } from '@upstash/redis';

// Vercel's Storage tab assigns one of these name pairs depending on the integration settings.
const CREDENTIAL_CANDIDATES: [string, string][] = [
  ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
  ['KV_REST_API_URL', 'KV_REST_API_TOKEN'],
  ['STORAGE_REST_API_URL', 'STORAGE_REST_API_TOKEN'],
  ['STORAGE_KV_REST_API_URL', 'STORAGE_KV_REST_API_TOKEN'],
  ['UPSTASH_REDIS_KV_REST_API_URL', 'UPSTASH_REDIS_KV_REST_API_TOKEN'],
];

/** The subset of Redis the stores use (hashes only). */
export interface HashStore {
  hset(key: string, values: Record<string, string>): Promise<unknown>;
  hgetall(key: string): Promise<Record<string, unknown> | null>;
  hget(key: string, field: string): Promise<unknown>;
  hdel(key: string, field: string): Promise<unknown>;
}

// Local testing only (PORTAL_MEMORY_STORE=1): keeps data in process memory. Never set this on Vercel.
const memory = new Map<string, Map<string, string>>();
const memoryStore: HashStore = {
  async hset(key, values) {
    const h = memory.get(key) || new Map<string, string>();
    for (const [f, v] of Object.entries(values)) h.set(f, v);
    memory.set(key, h);
  },
  async hgetall(key) {
    const h = memory.get(key);
    return h ? Object.fromEntries(h) : null;
  },
  async hget(key, field) {
    return memory.get(key)?.get(field) ?? null;
  },
  async hdel(key, field) {
    memory.get(key)?.delete(field);
  },
};

let cached: HashStore | null | undefined;
export function getRedis(): HashStore | null {
  if (cached !== undefined) return cached;
  for (const [urlKey, tokenKey] of CREDENTIAL_CANDIDATES) {
    const url = process.env[urlKey];
    const token = process.env[tokenKey];
    if (url && token) {
      cached = new Redis({ url, token }) as unknown as HashStore;
      return cached;
    }
  }
  cached = process.env.PORTAL_MEMORY_STORE === '1' ? memoryStore : null;
  return cached;
}

export const isStoreConfigured = () => getRedis() !== null;
