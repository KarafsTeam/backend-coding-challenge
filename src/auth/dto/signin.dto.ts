import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { trimEmptySpaces } from 'src/common/utils';
import { User } from 'src/user/user.schema';

export class SigninDTO extends PickType(User, ['email', 'password']) {
  @ApiProperty()
  @MaxLength(128)
  @IsEmail({})
  @Transform(({ value }) => trimEmptySpaces(value))
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @MaxLength(30)
  @Transform(({ value }) => trimEmptySpaces(value))
  @IsString()
  @IsNotEmpty()
  password: string;
}
