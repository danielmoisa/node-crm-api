import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PrismaModule } from './providers/prisma/prisma.module';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
