import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { UserRepository } from './user.repository';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async updateLocationTracking(userId: Types.ObjectId, enabled: boolean): Promise<User> {
    return this.userRepo.findOneAndUpdate({ _id: userId }, { locationTrackingEnabled: enabled });
  }
}
