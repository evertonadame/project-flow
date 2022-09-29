import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private logger: Logger = new Logger('📚 PrismaService');

  constructor() {
    super({
      log: [
        {
          emit: process.env.NODE_ENV == 'development' ? 'event' : 'stdout',
          level: process.env.NODE_ENV == 'development' ? 'query' : 'error',
        },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();
    // Soft Delete
    this.softDelete();
    if (process.env.NODE_ENV == 'development') {
      this.logging();
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  logging() {
    this.logger.log('Log actived');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('query', async (e) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.logger.log(`Query time: ${e.duration}ms`);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.logger.log(`Query: ${e.query} | ${e.params}`);
    });

    // this.$use(async (params, next) => {
    //   const before = Date.now();
    //   this.logger.log(`Query ${params.model}.${params.action}`, params);

    //   const result = await next(params);
    //   const after = Date.now();
    //   this.logger.log(
    //     `Query ${params.model}.${params.action} took ${after - before}ms`,
    //   );
    //   return result;
    // });
  }

  softDelete() {
    this.$use(async (params, next) => {
      const modelMap = (this as any)?._baseDmmf?.modelMap;
      const isSoftDelete =
        modelMap[params.model].fields.filter((field): any => {
          return field.name == 'deleted';
        }).length > 0;
      if (isSoftDelete) {
        if (params.action == 'delete') {
          params.action = 'update';
          params.args['data'] = { deleted: dayjs().format() };
        }
        if (params.action == 'deleteMany') {
          params.action = 'updateMany';
          if (params.args.data != undefined) {
            params.args.data['deleted'] = dayjs().format();
          } else {
            params.args['data'] = { deleted: dayjs().format() };
          }
        }

        if (['findUnique', 'findFirst'].includes(params.action)) {
          params.action = 'findFirst';
          params.args.where['deleted'] = null;
        }
        if (params.action == 'findMany') {
          if (params.args.where != undefined) {
            if (params.args.where.deleted == undefined) {
              params.args.where['deleted'] = null;
            }
          } else {
            params.args['where'] = { deleted: null };
          }
        }
      }
      return next(params);
    });
  }
}
