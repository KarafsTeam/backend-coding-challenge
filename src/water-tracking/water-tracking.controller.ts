import { Types } from 'mongoose';
import { WaterGoal } from './schemas';
import { UserRole } from 'src/user/user.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserId } from 'src/auth/decorators/user.decorator';
import { WaterTrackingService } from './water-tracking.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Post, Body, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { TrackingController } from 'src/common/controllers/tracking.controller';
import { PostWaterGoalDto, PostWaterIntakeDto } from './dto';

@Roles(UserRole.USER)
@UseGuards(JwtAuthGuard)
@ApiTags('Water Tracking')
@TrackingController('/water')
export class WaterTrackingController {
  constructor(private readonly waterTrackingService: WaterTrackingService) {}

  @Post('goal')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Set a new water goal for the user.' })
  @ApiOkResponse({ type: WaterGoal, description: 'New water goal set successfully' })
  async setNewWaterGoal(@UserId() userId: Types.ObjectId, @Body() body: PostWaterGoalDto) {
    return this.waterTrackingService.setNewWaterGoal(userId, body.dailyGoal);
  }

  @Post('intake')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Track water intake for the user.' })
  @ApiOkResponse({ description: 'Water intake tracked successfully' })
  async trackWaterIntake(@Body('userId') userId: Types.ObjectId, @Body() body: PostWaterIntakeDto) {
    return this.waterTrackingService.trackWaterIntake(userId, body.amount);
  }

  // @Get('streak')
  // @ApiOperation({ summary: 'Get the current streak for the user.' })
  // async getStreak(@Param('userId') userId: Types.ObjectId) {
  //   return this.waterTrackingService.getStreak(userId);
  // }
}
