// test/extensions/customFind/extension.test.ts
import { PrismaClient } from '@prisma/client';
import { PrismaCustomFindExtension } from './extension';
import { PaginationParam } from './type';

describe('PrismaCustomFindExtension', () => {
  const prisma = new PrismaClient();

  const xprisma = prisma.$extends(PrismaCustomFindExtension());

  beforeAll(async () => {
    await prisma.$connect();
    await prisma.model.deleteMany();
  });

  afterAll(async () => {
    await prisma.model.deleteMany();
    await prisma.$disconnect();
  });

  it('should return items and total count with pagination', async () => {
    await xprisma.model.create({ data: { id: 1 } });
    const paginationParam: PaginationParam = { page: 1, limit: 2, offset: 0 };
    const result = await xprisma.model.findAndCountMany({
      where: { id: 1 },
      paginationParam,
    });

    expect(result.items).toEqual([{ id: 1 }]);
  });
});