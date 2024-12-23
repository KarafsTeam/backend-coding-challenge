import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/env.validation';

@Module({
  imports: [ConfigModule.forRoot({ validate, isGlobal: true })],
})
export class AppModule {}
