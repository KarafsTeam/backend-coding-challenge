import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractDocument } from 'src/common/database/abstract.schema';
import { User } from 'src/user/user.schema';

@Schema({ timestamps: true, versionKey: false })
export class WaterGoal extends AbstractDocument {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId | User;

  @Prop({ required: true, default: 2000 })
  dailyGoal!: number;

  @Prop({ required: true, default: true })
  isActive!: boolean;
}

export const WaterGoalSchema = SchemaFactory.createForClass(WaterGoal);
WaterGoalSchema.index({ user: 1 });
