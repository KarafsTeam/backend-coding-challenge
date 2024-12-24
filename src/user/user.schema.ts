import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/database/abstract.schema';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Schema({
  // Adds createdAt and updatedAt automatically
  timestamps: true,
  // Disable __v field
  versionKey: false,
})
export class User extends AbstractDocument {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ type: String, enum: UserRole, required: true })
  role!: UserRole;

  // TODO: it's better to define below fields in different documents
  // to track user actions history and behavior
  // and avoid making user document larger
  @Prop({ required: true, default: 2000 }) // 2000ml = 2L default daily goal
  dailyWaterGoal!: number;

  @Prop({ default: 0 })
  currentStreak!: number;

  @Prop({ type: Date, default: null })
  lastStreakUpdate!: Date | null;

  @Prop({ default: false })
  locationTrackingEnabled!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 });
UserSchema.index({ roles: 1 });
