import { Post, Body, UseGuards } from '@nestjs/common';
import { WaterTrackingService } from './water-tracking.service';
import { Types } from 'mongoose';
import { TrackingController } from 'src/common/controllers/tracking.controller';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/user/user.schema';
import { UserId } from 'src/auth/decorators/user.decorator';
import { PostWaterGoalDto } from './dto/water-goal.dto';

@Roles(UserRole.USER)
@UseGuards(JwtAuthGuard)
@TrackingController('/water')
export class WaterTrackingController {
  constructor(private readonly waterTrackingService: WaterTrackingService) {}

  @Post('goal')
  @ApiOperation({ summary: 'Set a new water goal for the user.' })
  async setNewWaterGoal(@UserId() userId: Types.ObjectId, @Body() body: PostWaterGoalDto) {
    return this.waterTrackingService.setNewWaterGoal(userId, body.dailyGoal);
  }

  // @Post('intake')
  // @ApiOperation({ summary: 'Track water intake for the user.' })
  // async trackWaterIntake(@Body('userId') userId: Types.ObjectId, @Body('amount') amount: number) {
  //   return this.waterTrackingService.trackWaterIntake(userId, amount);
  // }

  // @Get('streak')
  // @ApiOperation({ summary: 'Get the current streak for the user.' })
  // async getStreak(@Param('userId') userId: Types.ObjectId) {
  //   return this.waterTrackingService.getStreak(userId);
  // }
}
