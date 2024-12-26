import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractDocument } from 'src/common/database/abstract.schema';
import { User } from 'src/user/user.schema';
import { WaterGoal } from './water-goal.schema';

@Schema({ timestamps: true, versionKey: false })
export class WaterIntake extends AbstractDocument {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user!: Types.ObjectId | User;

  @Prop({ type: Types.ObjectId, ref: WaterGoal.name, required: true })
  goal!: Types.ObjectId | WaterGoal;

  @Prop({ required: true })
  amount!: number;
}

export const WaterIntakeSchema = SchemaFactory.createForClass(WaterIntake);
