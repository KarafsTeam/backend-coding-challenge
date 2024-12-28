import { Types } from 'mongoose';
import { getDistance } from 'geolib';
import { lastValueFrom } from 'rxjs';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserRepository } from 'src/user/user.repository';
import { PostGpsLocationDto } from './dto/location-log.dto';

import { GpsLocationRepository } from './repository/gps-location.repository';
@Injectable()
export class MovementTrackingService {
  constructor(
    private userRepo: UserRepository,
    private gpsLocationRepo: GpsLocationRepository,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {}

  private async getUserLocationTrackingStatus() {
    return await this.userRepo.find({ locationTrackingEnabled: true });
  }

  async logLocation(userId: Types.ObjectId, topic: string, location: PostGpsLocationDto) {
    // TODO: definitely not the right way to check if location tracking is enabled
    // cuz it adds a lot of overhead to each request
    // it's better add location status to user token and create guard for it,
    // or using a in-memory db and add user location status to it

    const isEnabled = await this.getUserLocationTrackingStatus();

    if (isEnabled) throw new BadRequestException('Location tracking is disabled for this user');

    await lastValueFrom(this.kafkaClient.emit(topic, { userId, location }));
  }

  async handleLocationData(payload: { location: PostGpsLocationDto; userId: Types.ObjectId }) {
    const { location, userId } = payload;

    // Save the GPS location data
    await this.gpsLocationRepo.create({
      user: userId,
      latitude: location.latitude,
      longitude: location.longitude,
      timestamp: new Date(location.timestamp),
    });

    // Calculate the total distance traveled in the last hour
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    const locations = await this.gpsLocationRepo.find({
      user: userId,
      timestamp: { $gte: oneHourAgo },
    });

    let totalDistance = 0;
    for (let i = 1; i < locations.length; i++) {
      totalDistance += getDistance(
        { latitude: locations[i - 1].latitude, longitude: locations[i - 1].longitude },
        { latitude: locations[i].latitude, longitude: locations[i].longitude },
      );
    }

    console.log(`Total distance traveled in the last hour: ${totalDistance} meters`);
  }
}
