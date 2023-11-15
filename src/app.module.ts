import { ConfigModule } from '@nestjs/config';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './providers/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ItemsModule } from './modules/items/items.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    PrismaModule,
    InvoicesModule,
    UsersModule,
    AuthModule,
    ItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
