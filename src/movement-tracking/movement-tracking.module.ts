import { Module } from '@nestjs/common';
import { MovementTrackingService } from './movement-tracking.service';
import { MovementTrackingController } from './movement-tracking.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  providers: [MovementTrackingService],
  controllers: [MovementTrackingController],
})
export class MovementTrackingModule {}
