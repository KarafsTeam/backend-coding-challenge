import { Types } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from 'src/user/user.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { MOVEMENT_TRACKING_TOPIC } from 'src/common/constants';
import { MovementTrackingService } from './movement-tracking.service';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { TrackingController } from 'src/common/controllers/tracking.controller';
import { HttpCode, HttpStatus, Inject, OnModuleInit, Post, UseGuards } from '@nestjs/common';
import { UserId } from 'src/auth/decorators/user.decorator';
import { PostGpsLocationDto } from './dto/location-log.dto';

@ApiTags('Movement Tracking')
@TrackingController('/movement')
export class MovementTrackingController implements OnModuleInit {
  constructor(
    private readonly movementTrackingService: MovementTrackingService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    // Subscribe to the Kafka topic
    this.kafkaClient.subscribeToResponseOf(MOVEMENT_TRACKING_TOPIC);
  }

  @Post('location')
  @Roles(UserRole.USER)
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logUserLocation(@UserId() userId: Types.ObjectId, location: PostGpsLocationDto) {
    await this.movementTrackingService.logLocation(userId, MOVEMENT_TRACKING_TOPIC, location);
  }

  @EventPattern(MOVEMENT_TRACKING_TOPIC)
  async handleLocationData(@Payload() payload: { location: PostGpsLocationDto; userId: Types.ObjectId }) {
    console.log(
      'Received location dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:',
      payload,
    );
    // Handle the received location data
  }
}
