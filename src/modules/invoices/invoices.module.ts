import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService, PrismaService, UsersService],
})
export class InvoicesModule {}
