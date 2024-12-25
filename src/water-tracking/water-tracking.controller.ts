import { UseGuards } from '@nestjs/common';
import { UserRole } from 'src/user/user.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { TrackingController } from 'src/common/controllers/tracking.controller';

@Roles(UserRole.USER)
@UseGuards(JwtAuthGuard)
@TrackingController('water')
export class WaterTrackingController {}
