import type { Redis } from 'ioredis';

export interface CacheExtensionConfig {
  /**
   * Redis client
   */
  redis: Redis;
}