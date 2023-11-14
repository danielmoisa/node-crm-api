import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from '@prisma/client';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto, req): Promise<Invoice> {
    const user = await this.usersService.getCurrentUser(req);
    return await this.prisma.invoice.create({
      data: {
        ...createInvoiceDto,
        User: { connect: { id: user.id } },
      },
    });
  }

  async findAll(req) {
    const user = await this.usersService.getCurrentUser(req);
    return await this.prisma.invoice.findMany({ where: { userId: user.id } });
  }

  async findOne(id: number, req) {
    const user = await this.usersService.getCurrentUser(req);
    return await this.prisma.invoice.findFirstOrThrow({
      where: { userId: user.id },
    });
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto, req) {
    // Get the current user
    const user = await this.usersService.getCurrentUser(req);

    // Check if the invoice exists and belongs to the current user
    const existingInvoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: { User: true },
    });

    if (!existingInvoice) {
      throw new NotFoundException('Invoice not found');
    }

    if (existingInvoice.userId !== user.id) {
      throw new UnauthorizedException(
        'You are not authorized to update this invoice',
      );
    }

    // Update the invoice
    return this.prisma.invoice.update({
      where: { id },
      data: updateInvoiceDto,
    });
  }

  async remove(id: number, req) {
    const user = await this.usersService.getCurrentUser(req);
    // Check if the invoice exists and belongs to the current user
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: { User: true },
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    if (invoice.userId !== user.id) {
      throw new UnauthorizedException(
        'You are not authorized to delete this invoice',
      );
    }

    // Delete the invoice
    return this.prisma.invoice.delete({ where: { id } });
  }
}
