import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { GpsLocation } from '../schema/gps-location.schema';

@Injectable()
export class GpsLocationRepository extends AbstractRepository<GpsLocation> {
  protected readonly logger = new Logger(GpsLocationRepository.name);

  constructor(
    @InjectModel(GpsLocation.name)
    gpsLocationModel: Model<GpsLocation>,
  ) {
    super(gpsLocationModel);
  }
}
