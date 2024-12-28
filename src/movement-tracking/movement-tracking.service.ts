import { Types } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserRepository } from 'src/user/user.repository';
import { PostGpsLocationDto } from './dto/location-log.dto';
@Injectable()
export class MovementTrackingService {
  // public kafkaClients: ClientKafka;

  constructor(
    private userRepo: UserRepository,
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
}
