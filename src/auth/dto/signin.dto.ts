import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { trimEmptySpaces } from 'src/common/utils';
import { User } from 'src/user/user.schema';

export class SigninRequestDTO extends PickType(User, ['email', 'password']) {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @MaxLength(128)
  @IsEmail({})
  @Transform(({ value }) => trimEmptySpaces(value))
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'strongPassword123',
  })
  @MaxLength(30)
  @Transform(({ value }) => trimEmptySpaces(value))
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SigninResponseDTO {
  @ApiProperty({
    description: 'Access token for the authenticated user',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token for the authenticated user',
    example: 'dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...',
  })
  refreshToken: string;
}
