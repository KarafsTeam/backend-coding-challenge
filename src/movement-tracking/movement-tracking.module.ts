import { Module } from '@nestjs/common';
import { MovementTrackingService } from './movement-tracking.service';
import { MovementTrackingController } from './movement-tracking.controller';

@Module({
  providers: [MovementTrackingService],
  controllers: [MovementTrackingController],
})
export class MovementTrackingModule {}
