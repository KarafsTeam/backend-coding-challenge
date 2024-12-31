import { Injectable, NotFoundException } from '@nestjs/common';
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

  async trackWaterIntake(userId: Types.ObjectId, amount: number) {
    // Find the active goal
    const activeGoal = await this.waterGoalRepository.findOne({ user: userId, isActive: true });

    // Check if there is an active goal
    if (!activeGoal) throw new NotFoundException('No active water goal found');

    // Create new intake record
    const intake = await this.waterIntakeRepository.create({ user: userId, goal: activeGoal._id, amount });

    // Calculate total intake for today
    const totalIntakeToday = await this.calculateTotalIntakeToday(userId);

    // Check if the intake meets or exceeds the daily goal
    if (totalIntakeToday >= activeGoal.dailyGoal) {
      // Get the start of today
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      // Update or create streak
      const streak = await this.waterStreakRepository.findOne({ user: userId, isActive: true });

      if (streak) {
        // Check if the streak was updated today
        if (streak.updatedAt < startOfDay) {
          await this.waterStreakRepository.findOneAndUpdate(
            { _id: streak._id },
            { $inc: { currentStreak: 1 }, updatedAt: new Date() },
          );
        }
      } else {
        // Create new streak
        await this.waterStreakRepository.create({
          user: userId,
          isActive: true,
          currentStreak: 1,
          goal: activeGoal._id,
        });
      }

      return intake;
    }
  }

  private async calculateTotalIntakeToday(userId: Types.ObjectId): Promise<number> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const totalIntakeToday = await this.waterIntakeRepository.aggregate<{ total: number }>([
      { $match: { user: userId, createdAt: { $gte: startOfDay } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    return totalIntakeToday[0]?.total || 0;
  }

  async getStreak(userId: Types.ObjectId) {
    return this.waterStreakRepository.findOne({ user: userId, isActive: true });
  }
}
