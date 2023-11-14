import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Injectable } from '@nestjs/common';
import { Invoice } from '@prisma/client';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    //TODO: Check if user exists first with usersService

    const { userId, ...data } = createInvoiceDto;

    return await this.prisma.invoice.create({
      data: {
        ...data,
        User: { connect: { id: userId } },
      },
    });
  }

  async findAll() {
    //TODO: Check if user exists first with usersService
    const userId = 1;

    return await this.prisma.invoice.findMany({ where: { userId: userId } });
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
