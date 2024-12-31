import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractDocument } from 'src/common/database/abstract.schema';
import { User } from 'src/user/user.schema';
import { WaterGoal } from './water-goal.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, versionKey: false })
export class WaterIntake extends AbstractDocument {
  @ApiProperty({ type: String, description: 'User ID' })
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user!: Types.ObjectId | User;

  @ApiProperty({ type: String, description: 'Water Goal ID' })
  @Prop({ type: Types.ObjectId, ref: WaterGoal.name, required: true })
  goal!: Types.ObjectId | WaterGoal;

  @ApiProperty({ type: Number, description: 'Amount of water intake' })
  @Prop({ required: true })
  amount!: number;
}

export const WaterIntakeSchema = SchemaFactory.createForClass(WaterIntake);
