import { Types } from 'mongoose';
import { getDistance } from 'geolib';
import { lastValueFrom } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';
import { UserRepository } from 'src/user/user.repository';
import { PostGpsLocationDto } from './dto/location-log.dto';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
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
    const { locationTrackingEnabled } = await this.userRepo.findOne({ locationTrackingEnabled: true });
    return locationTrackingEnabled;
  }

  async logLocation(userId: Types.ObjectId, topic: string, location: PostGpsLocationDto) {
    // TODO: definitely not the right way to check if location tracking is enabled
    // cuz it adds a lot of overhead to each request
    // it's better add location status to user token and create guard for it,
    // or using a in-memory db and add user location status to it

    const isEnabled = await this.getUserLocationTrackingStatus();

    if (!isEnabled) throw new BadRequestException('Location tracking is disabled for this user');

    await lastValueFrom(this.kafkaClient.emit(topic, { userId, location }));
  }

  async handleLocationData(payload: { location: PostGpsLocationDto; userId: Types.ObjectId }) {
    // TODO: aggregated periodically in summary statistics (total stance per hour) and
    // store it in a time-series db like InfluxDB

    // sample data:
    // { latitude: 37.7749, longitude: -122.4194 },
    // { latitude: 37.7750, longitude: -122.4195 },
    // { latitude: 37.7751, longitude: -122.4196 },
    // { latitude: 37.7752, longitude: -122.4197 },
    // { latitude: 37.7753, longitude: -122.4198 },

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
