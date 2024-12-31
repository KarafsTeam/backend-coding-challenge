import { forwardRef, Module } from '@nestjs/common';
import { UserSchema, User } from './user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UserRepository, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserRepository, UserService],
  controllers: [UserController],
})
export class UserModule {}
