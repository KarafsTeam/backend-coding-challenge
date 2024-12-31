import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PatchLocationTrackingDto {
  @ApiProperty({ description: 'Enable or disable location tracking' })
  @IsBoolean()
  @IsNotEmpty()
  enabled: boolean;
}
