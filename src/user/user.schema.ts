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

  @Prop({ default: false })
  locationTrackingEnabled?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ roles: 1 });
