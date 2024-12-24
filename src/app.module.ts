import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables, validate } from './common/env.validation';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true }),
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
