import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { Module } from '@nestjs/common';
import { PdfService } from '../../providers/pdf/pdf.service';
import { PrismaService } from '../../providers/prisma/prisma.service';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService, PrismaService, PdfService],
})
export class InvoicesModule {}
