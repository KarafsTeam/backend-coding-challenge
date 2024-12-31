import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractDocument } from 'src/common/database/abstract.schema';
import { User } from 'src/user/user.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, versionKey: false })
export class GpsLocation extends AbstractDocument {
  @ApiProperty({ type: String, description: 'User ID' })
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user!: Types.ObjectId | User;

  @ApiProperty({ type: Number, description: 'Latitude of the GPS location' })
  @Prop({ required: true })
  latitude!: number;

  @ApiProperty({ type: Number, description: 'Longitude of the GPS location' })
  @Prop({ required: true })
  longitude!: number;

  @ApiProperty({ type: Date, description: 'Timestamp of the GPS location' })
  @Prop({ required: true })
  timestamp!: Date;
}

export const GpsLocationSchema = SchemaFactory.createForClass(GpsLocation);
GpsLocationSchema.index({ user: 1, timestamp: 1 });
