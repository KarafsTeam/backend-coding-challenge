import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { WaterGoalRepository, WaterIntakeRepository, WaterStreakRepository } from './repositories';

@Injectable()
export class WaterTrackingService {
  constructor(
    private readonly waterGoalRepository: WaterGoalRepository,
    private readonly waterStreakRepository: WaterStreakRepository,
    private readonly waterIntakeRepository: WaterIntakeRepository,
  ) {}

  async setNewWaterGoal(userId: Types.ObjectId, dailyGoal: number) {
    // Deactivate current active goal
    await this.waterGoalRepository.findOneAndUpdate({ user: userId, isActive: true }, { isActive: false });

    // Create new goal
    const newGoal = await this.waterGoalRepository.create({ user: userId, dailyGoal, isActive: true });
    return newGoal;
  }
}
