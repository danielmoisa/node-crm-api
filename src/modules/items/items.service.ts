import { Injectable, NotFoundException } from '@nestjs/common';
import { InvoiceItem, User } from '@prisma/client';

import { CreateItemDto } from './dto/create-item.dto';
import { NOT_FOUND } from '../../errors/errors.constants';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createItemDto: CreateItemDto,
    user: User,
    invoiceId: number,
  ): Promise<InvoiceItem> {
    const { name, description, price, enabled } = createItemDto;

    const invoice = await this.prisma.invoice.findUnique({
      where: { id: invoiceId, userId: user.id },
    });

    if (!invoice) throw new NotFoundException(NOT_FOUND);

    const newItem = await this.prisma.invoiceItem.create({
      data: {
        name,
        description,
        price,
        enabled,
        Invoice: { connect: { id: invoice.id } },
      },
    });

    return newItem;
  }

  async findAll(invoiceId: number, userId: number): Promise<InvoiceItem[]> {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id: invoiceId, userId },
    });

    if (!invoice) throw new NotFoundException(NOT_FOUND);

    const allItems = await this.prisma.invoiceItem.findMany({
      where: {
        invoiceId: invoice.id,
      },
    });
    return allItems;
  }

  async findOne(
    id: number,
    invoiceId: number,
    userId: number,
  ): Promise<InvoiceItem | null> {
    const invoice = await this.prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId,
      },
    });
    if (!invoice) throw new NotFoundException(NOT_FOUND);

    const item = await this.prisma.invoiceItem.findUnique({
      where: {
        id,
      },
    });

    return item;
  }

  async update(
    id: number,
    invoiceId: number,
    userId: number,
    updateItemDto: UpdateItemDto,
  ): Promise<InvoiceItem> {
    const invoice = await this.prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId,
      },
    });
    if (!invoice) throw new NotFoundException(NOT_FOUND);

    const updatedItem = await this.prisma.invoiceItem.update({
      where: {
        id,
      },
      data: updateItemDto,
    });

    return updatedItem;
  }

  async remove(
    id: number,
    invoiceId: number,
    userId: number,
  ): Promise<InvoiceItem> {
    const invoice = await this.prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId,
      },
    });
    if (!invoice) throw new NotFoundException(NOT_FOUND);

    const deletedItem = await this.prisma.invoiceItem.delete({
      where: {
        id,
      },
    });

    return deletedItem;
  }
}
