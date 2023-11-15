import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  NOT_FOUND,
  UNAUTHORIZED_RESOURCE,
} from '../../errors/errors.constants';

import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from '@prisma/client';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createInvoiceDto: CreateInvoiceDto,
    userId: number,
  ): Promise<Invoice> {
    return await this.prisma.invoice.create({
      data: {
        ...createInvoiceDto,
        User: { connect: { id: userId } },
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.invoice.findMany({
      where: { userId: userId },
      include: { items: true },
    });
  }

  async findOne(id: number, userId: number) {
    const invoice = await this.prisma.invoice.findFirst({
      where: { userId, id },
      include: { items: true },
    });

    if (!invoice) throw new NotFoundException(NOT_FOUND);

    return invoice;
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto, userId: number) {
    // Check if the invoice exists and belongs to the current user
    const existingInvoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: { User: true },
    });

    if (!existingInvoice) throw new NotFoundException(NOT_FOUND);

    if (existingInvoice.userId !== userId)
      throw new UnauthorizedException(UNAUTHORIZED_RESOURCE);

    // Update the invoice
    return this.prisma.invoice.update({
      where: { id },
      data: updateInvoiceDto,
    });
  }

  async remove(id: number, userId: number) {
    // Check if the invoice exists and belongs to the current user
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: { User: true },
    });

    if (!invoice) throw new NotFoundException(NOT_FOUND);

    if (invoice.userId !== userId)
      throw new UnauthorizedException(UNAUTHORIZED_RESOURCE);

    // Delete the invoice
    return this.prisma.invoice.delete({ where: { id, userId: userId } });
  }
}
