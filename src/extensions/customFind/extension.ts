import { Prisma } from '@prisma/client/extension';
import { PaginationParam } from './type';
import R from 'ramda';

export const PrismaCustomFindExtension = () => {

  return Prisma.defineExtension({
    name: 'prisma-custom-find',
    model: {
      $allModels: {
        async findAndCountMany<T, A>(
          this: T,
          args: Omit<Prisma.Args<T, 'findMany'>, 'take' | 'skip'> & {
            paginationParam: PaginationParam;
          },
        ) {
          const [items, total]: [Prisma.Result<T, A, 'findMany'>, number] =
            await Promise.all([
              (this as any).findMany({
                ...R.omit(['paginationParam'], args),
                take: args.paginationParam.limit,
                skip: args.paginationParam.offset,
              }),
              (this as any).count(
                R.omit(['paginationParam'], R.omit(['include'], args)),
              ),
            ]);

          return {
            items,
            total,
            page: args.paginationParam.page,
            limit: args.paginationParam.limit,
          };
        },
      },
    },
  });
};