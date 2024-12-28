import { Module } from '@nestjs/common';
import { MovementTrackingService } from './movement-tracking.service';
import { MovementTrackingController } from './movement-tracking.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [MovementTrackingService],
  controllers: [MovementTrackingController],
})
export class MovementTrackingModule {}
