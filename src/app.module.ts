import { ConfigModule } from '@nestjs/config';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './providers/prisma/prisma.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    PrismaModule,
    InvoicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
