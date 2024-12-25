import { Module } from '@nestjs/common';
import { WaterTrackingController } from './water-tracking.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [WaterTrackingController],
})
export class WaterTrackingModule {}
