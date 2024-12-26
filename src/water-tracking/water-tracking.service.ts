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

  // async trackWaterIntake(userId: Types.ObjectId, amount: number) {
  //   const activeGoal = await this.waterGoalRepository.findOne({ user: userId, isActive: true });
  //   if (!activeGoal) {
  //     throw new Error('No active water goal found');
  //   }

  //   await this.waterIntakeRepository.create({ user: userId, goal: activeGoal._id, amount });

  //   // Check if the intake meets the daily goal
  //   const totalIntakeToday = await this.waterIntakeRepository.aggregate([
  //     { $match: { user: userId, createdAt: { $gte: new Date().setHours(0, 0, 0, 0) } } },
  //     { $group: { _id: null, total: { $sum: '$amount' } } },
  //   ]);

  //   if (totalIntakeToday[0]?.total >= activeGoal.dailyGoal) {
  //     // Update streak
  //     const streak = await this.waterStreakRepository.findOne({ user: userId, isActive: true });
  //     if (streak) {
  //       await this.waterStreakRepository.findOneAndUpdate(
  //         { _id: streak._id },
  //         { $inc: { currentStreak: 1 } },
  //       );
  //     } else {
  //       await this.waterStreakRepository.create({
  //         user: userId,
  //         goal: activeGoal._id,
  //         currentStreak: 1,
  //         isActive: true,
  //       });
  //     }
  //   }
  // }

  // async getStreak(userId: Types.ObjectId) {
  //   return this.waterStreakRepository.findOne({ user: userId, isActive: true });
  // }
}
