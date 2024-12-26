import { Types } from 'mongoose';
import { User, UserRole } from 'src/user/user.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserId } from 'src/auth/decorators/user.decorator';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, UseGuards, HttpStatus, HttpCode, Patch, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { PatchLocationTrackingDto } from './dto/location.dto';

@Roles(UserRole.USER)
@UseGuards(JwtAuthGuard)
@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('location')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Patch User location status' })
  @ApiOkResponse({ type: User, description: 'When location successfully updated.' })
  async changeLocationStatus(@UserId() userId: Types.ObjectId, @Body() body: PatchLocationTrackingDto) {
    return this.userService.updateLocationTracking(userId, body.enabled);
  }
}
