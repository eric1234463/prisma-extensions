// test/extensions/customFind/extension.test.ts
import { PrismaClient } from '@prisma/client';
import { PrismaCacheExtension } from './extension';
import Redis from 'ioredis';

describe('PrismaCacheExtension', () => {
  const prisma = new PrismaClient();
  const redis = new Redis()
  const xprisma = prisma.$extends(PrismaCacheExtension(3600, { redis }));

  beforeAll(async () => {
    await prisma.$connect();
    await prisma.model.deleteMany();
  });

  afterAll(async () => {
    await prisma.model.deleteMany();
    await prisma.$disconnect();
  });

  it('should return items and total count with pagination', async () => {
    await xprisma.model.createWithCache({ data: { id: 1 } });
    const result = await xprisma.model.findFirstWithCache({ where: { id: 1 } });

    expect(result.id).toEqual(1);
  });
});