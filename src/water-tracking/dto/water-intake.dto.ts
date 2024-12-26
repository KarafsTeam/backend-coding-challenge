import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { WaterIntake, WaterStreak } from '../schemas';

export class PostWaterIntakeRequestDto {
  @ApiProperty({ description: 'Water intake in milliliters', example: 2000 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class TrackWaterIntakeResponseDto {
  @ApiProperty({ type: WaterIntake })
  intake: WaterIntake;

  @ApiProperty({ type: WaterStreak })
  streak: WaterStreak;
}
