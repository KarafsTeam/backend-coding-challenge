import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables, validate } from './common/env.validation';
import { WaterTrackingModule } from './water-tracking/water-tracking.module';
import { MovementTrackingModule } from './movement-tracking/movement-tracking.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_CLIENT_ID } from './common/constants';

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
          options: { singleLine: true, colorize: true },
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

    // kafka Connection
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: 'KAFKA_SERVICE',
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService<EnvironmentVariables>) => {
            return {
              transport: Transport.KAFKA,
              options: {
                clientId: KAFKA_CLIENT_ID,
                client: {
                  brokers: [`${configService.get('KAFKA_HOST')}:${configService.get('KAFKA_PORT')}`],
                },
              },
            };
          },
        },
      ],
    }),
    AuthModule,
    UserModule,
    WaterTrackingModule,
    MovementTrackingModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
