import { InvoiceItem, User } from '@prisma/client';

import { CreateItemDto } from './dto/create-item.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto): Promise<InvoiceItem> {
    const { name, description, price, enabled, invoiceId } = createItemDto;

    const newItem = await this.prisma.invoiceItem.create({
      data: {
        name,
        description,
        price,
        enabled,
        Invoice: { connect: { id: invoiceId } },
      },
    });

    return newItem;
  }

  async findAll(): Promise<InvoiceItem[]> {
    const allItems = await this.prisma.invoiceItem.findMany({});
    return allItems;
  }

  async findOne(id: number): Promise<InvoiceItem | null> {
    const item = await this.prisma.invoiceItem.findUnique({
      where: {
        id,
      },
    });

    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<InvoiceItem> {
    const updatedItem = await this.prisma.invoiceItem.update({
      where: {
        id,
      },
      data: updateItemDto,
    });

    return updatedItem;
  }

  async remove(id: number): Promise<InvoiceItem> {
    const deletedItem = await this.prisma.invoiceItem.delete({
      where: {
        id,
      },
    });

    return deletedItem;
  }
}
