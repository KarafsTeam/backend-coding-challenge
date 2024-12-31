import { PickType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength, IsEnum } from 'class-validator';
import { trimEmptySpaces } from 'src/common/utils';
import { User } from 'src/user/user.schema';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/user/user.schema';

export class SignupRequestDTO extends PickType(User, ['email', 'password', 'role']) {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    maxLength: 128,
  })
  @MaxLength(128)
  @IsEmail({})
  @Transform(({ value }) => trimEmptySpaces(value))
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'Password123',
    maxLength: 30,
  })
  @MaxLength(30)
  @Transform(({ value }) => trimEmptySpaces(value))
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    example: UserRole.USER,
    default: UserRole.USER,
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole = UserRole.USER;
}

export class SignupResponseDTO {
  @ApiProperty({
    description: 'User ID',
    example: '60d0fe4f5311236168a109ca',
  })
  id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    example: UserRole.USER,
  })
  role: UserRole;
}
