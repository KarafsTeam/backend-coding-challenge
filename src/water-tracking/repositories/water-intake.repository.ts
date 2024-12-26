import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { WaterIntake } from '../schemas/water-intake.schema';

@Injectable()
export class WaterIntakeRepository extends AbstractRepository<WaterIntake> {
  protected readonly logger = new Logger(WaterIntakeRepository.name);

  constructor(
    @InjectModel(WaterIntake.name)
    waterIntakeModel: Model<WaterIntake>,
  ) {
    super(waterIntakeModel);
  }
}
