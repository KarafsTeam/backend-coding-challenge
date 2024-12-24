import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/env.validation';

@Module({
  imports: [ConfigModule.forRoot({ validate, isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
