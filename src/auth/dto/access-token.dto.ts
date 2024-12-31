import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { trimEmptySpaces } from 'src/common/utils';
import { ApiProperty } from '@nestjs/swagger';

export class GetNewTokenRequestDto {
  @ApiProperty({ description: 'Refresh token to obtain a new access token and refresh token' })
  @Transform(({ value }) => trimEmptySpaces(value))
  @IsString()
  @IsNotEmpty()
  readonly refreshToken: string;
}
