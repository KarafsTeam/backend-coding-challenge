import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { WaterStreak } from '../schemas/water-streak.schema';

@Injectable()
export class WaterStreakRepository extends AbstractRepository<WaterStreak> {
  protected readonly logger = new Logger(WaterStreakRepository.name);

  constructor(
    @InjectModel(WaterStreak.name)
    waterStreakModel: Model<WaterStreak>,
  ) {
    super(waterStreakModel);
  }
}
