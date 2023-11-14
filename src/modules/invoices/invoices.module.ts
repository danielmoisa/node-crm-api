import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService, PrismaService],
})
export class InvoicesModule {}
