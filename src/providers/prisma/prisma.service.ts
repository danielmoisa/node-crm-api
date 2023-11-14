import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

type SensitiveFields = 'password'; // Add more fields as needed

export type Expose<T> = Omit<T, SensitiveFields>;

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  /** Delete sensitive keys from an object or an array of objects */
  expose<T>(item: T | T[]): Expose<T> | Expose<T>[] {
    if (Array.isArray(item)) {
      return item.map((singleItem) => this.expose(singleItem)) as Expose<T>[];
    }

    const { password, ...exposedItem } = item as Record<string, unknown>;
    return exposedItem as Expose<T>;
  }
}
