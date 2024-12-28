import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MovementTrackingService } from './movement-tracking.service';
import { MovementTrackingController } from './movement-tracking.controller';
import { GpsLocationRepository } from './repository/gps-location.repository';
import { GpsLocation, GpsLocationSchema } from './schema/gps-location.schema';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forFeature([{ name: GpsLocation.name, schema: GpsLocationSchema }]),
  ],
  providers: [MovementTrackingService, GpsLocationRepository],
  controllers: [MovementTrackingController],
})
export class MovementTrackingModule {}
