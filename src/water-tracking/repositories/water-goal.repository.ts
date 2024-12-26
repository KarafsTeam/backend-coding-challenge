import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { WaterGoal } from '../schemas/water-goal.schema';

@Injectable()
export class WaterGoalRepository extends AbstractRepository<WaterGoal> {
  protected readonly logger = new Logger(WaterGoalRepository.name);

  constructor(
    @InjectModel(WaterGoal.name)
    waterGoalModel: Model<WaterGoal>,
  ) {
    super(waterGoalModel);
  }
}
