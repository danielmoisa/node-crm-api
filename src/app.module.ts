import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] })],
  controllers: [],
  providers: [],
})
export class AppModule {}
