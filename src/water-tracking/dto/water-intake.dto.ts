import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostWaterIntakeDto {
  @ApiProperty({ description: 'Water intake in milliliters', example: 2000 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
