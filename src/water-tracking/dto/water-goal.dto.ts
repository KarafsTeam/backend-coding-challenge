import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostWaterGoalDto {
  @ApiProperty({
    description: 'Daily water intake goal in milliliters',
    example: 2000,
  })
  @IsNumber()
  @IsNotEmpty()
  dailyGoal: number;
}
