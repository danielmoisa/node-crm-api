import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Module } from '@nestjs/common';
import { PdfService } from '../../providers/pdf/pdf.service';
import { PrismaService } from '../../providers/prisma/prisma.service';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, PrismaService, PdfService],
})
export class ItemsModule {}
