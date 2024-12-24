import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables, validate } from './common/env.validation';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    // Config module to read and validate Environment variables
    ConfigModule.forRoot({ validate, isGlobal: true }),

    // Rate limiting / implement in webserver/NGINX
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),

    // Logging Module
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: { singleLine: true },
        },
      },
    }),

    // MongoDB Connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        dbName: configService.get('MONGO_DATABASE'),
        uri: `mongodb://${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}`,
        auth: {
          username: configService.get('MONGO_USERNAME'),
          password: configService.get('MONGO_PASSWORD'),
        },
      }),
    }),

    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
