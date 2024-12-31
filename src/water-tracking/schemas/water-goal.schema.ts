import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractDocument } from 'src/common/database/abstract.schema';
import { User } from 'src/user/user.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, versionKey: false })
export class WaterGoal extends AbstractDocument {
  @ApiProperty({
    description: 'Reference to the user who set the water goal',
    type: String,
  })
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId | User;

  @ApiProperty({
    description: 'Daily water intake goal in milliliters',
    example: 2000,
  })
  @Prop({ required: true, default: 2000 })
  dailyGoal!: number;

  @ApiProperty({
    description: 'Indicates if the water goal is currently active',
    example: true,
  })
  @Prop({ required: true, default: true })
  isActive!: boolean;
}

export const WaterGoalSchema = SchemaFactory.createForClass(WaterGoal);
WaterGoalSchema.index({ user: 1 });
