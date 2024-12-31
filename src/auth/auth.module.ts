import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule, forwardRef(() => UserModule), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
