import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractDocument } from 'src/common/database/abstract.schema';
import { User } from 'src/user/user.schema';
import { WaterGoal } from './water-goal.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, versionKey: false })
export class WaterStreak extends AbstractDocument {
  @ApiProperty({ type: String, description: 'User ID or User object' })
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user!: Types.ObjectId | User;

  @ApiProperty({ type: Number, description: 'Current streak count', default: 0 })
  @Prop({ required: true, default: 0 })
  currentStreak!: number;

  @ApiProperty({ type: String, description: 'Water goal ID or WaterGoal object' })
  @Prop({ type: Types.ObjectId, ref: WaterGoal.name, required: true })
  goal!: Types.ObjectId | WaterGoal;

  @ApiProperty({ type: Boolean, description: 'Is the streak active', default: true })
  @Prop({ required: true, default: true })
  isActive!: boolean;
}

export const WaterStreakSchema = SchemaFactory.createForClass(WaterStreak);
