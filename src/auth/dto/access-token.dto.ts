import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { trimEmptySpaces } from 'src/common/utils';

export class GetNewTokenRequestDto {
  @Transform(({ value }) => trimEmptySpaces(value))
  @IsString()
  @IsNotEmpty()
  readonly refreshToken: string;
}
