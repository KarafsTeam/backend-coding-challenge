import { Module } from '@nestjs/common';
import { WaterTrackingController } from './water-tracking.controller';
import { AuthModule } from 'src/auth/auth.module';
import { WaterTrackingService } from './water-tracking.service';
import {
  WaterGoal,
  WaterGoalSchema,
  WaterIntake,
  WaterIntakeSchema,
  WaterStreak,
  WaterStreakSchema,
} from './schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { WaterGoalRepository, WaterIntakeRepository, WaterStreakRepository } from './repositories';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: WaterGoal.name, schema: WaterGoalSchema }]),
    MongooseModule.forFeature([{ name: WaterStreak.name, schema: WaterStreakSchema }]),
    MongooseModule.forFeature([{ name: WaterIntake.name, schema: WaterIntakeSchema }]),
  ],
  controllers: [WaterTrackingController],
  providers: [WaterTrackingService, WaterIntakeRepository, WaterGoalRepository, WaterStreakRepository],
})
export class WaterTrackingModule {}
