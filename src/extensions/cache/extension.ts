import { Prisma } from '@prisma/client/extension';
import { CacheExtensionConfig } from './type';

export const PrismaCacheExtension = (
  ttl: number,
  config: CacheExtensionConfig,
) => {
  const { redis } = config;

  return Prisma.defineExtension({
    name: 'prisma-custom-cache',
    client: {
      redis,
    },
    model: {
      $allModels: {
        async findFirstWithCache<T, A>(
          this: T,
          args: Prisma.Args<T, 'findFirst'>,
        ) {
          const modelName = (this as any).name;
          if (args.where && args.where.id) {
            const redisKey = `${modelName}:${args.where.id}`;
            try {
              const cachedValue = await redis.get(redisKey);
              if (cachedValue) {
                console.log(`Cache hit for key: ${redisKey}`);
                return JSON.parse(cachedValue);
              }
              console.log(`Cache miss for key: ${redisKey}`);
            } catch (error) {
              console.error(`Error fetching from cache: ${error}`);
            }
          }

          const result = await (this as any).findFirst(args);
          if (args.where && args.where.id) {
            const redisKey = `${modelName}:${args.where.id}`;
            try {
              await redis.set(redisKey, JSON.stringify(result), 'EX', ttl);
            } catch (error) {
              console.error(`Error setting cache: ${error}`);
            }
          }

          return result;
        },

        async createWithCache<T, A>(
          this: T,
          args: Prisma.Args<T, 'create'>,
        ) {
          const modelName = (this as any).name;

          const result = await (this as any).create(args);
          if (result && result.id) {
            const redisKey = `${modelName}:${result.id}`;
            try {
              await redis.set(redisKey, JSON.stringify(result), 'EX', ttl);
            } catch (error) {
              console.error(`Error updating cache: ${error}`);
            }
          }

          return result;
        },

        async updateWithCache<T, A>(
          this: T,
          args: Prisma.Args<T, 'update'>,
        ) {
          const modelName = (this as any).name;

          const result = await (this as any).update(args);
          if (args.where && args.where.id) {
            const redisKey = `${modelName}:${args.where.id}`;
            try {
              await redis.set(redisKey, JSON.stringify(result), 'EX', ttl);
            } catch (error) {
              console.error(`Error updating cache: ${error}`);
            }
          }

          return result;
        },
      },
    },
  });
};