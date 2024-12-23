import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/env.validation';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot({ validate, isGlobal: true })],
  controllers: [AppController],
})
export class AppModule {}
