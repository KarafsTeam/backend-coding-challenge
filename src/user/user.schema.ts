import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/database/abstract.schema';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Schema({ timestamps: true, versionKey: false })
export class User extends AbstractDocument {
  @ApiProperty({ description: 'User email address', uniqueItems: true })
  @Prop({ required: true, unique: true })
  email!: string;

  @ApiProperty({ description: 'User password' })
  @Prop({ required: true })
  password!: string;

  @ApiProperty({ description: 'User role', enum: UserRole })
  @Prop({ type: String, enum: UserRole, required: true })
  role!: UserRole;

  @ApiProperty({ description: 'Location tracking enabled status', default: false })
  @Prop({ default: false })
  locationTrackingEnabled?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ roles: 1 });
