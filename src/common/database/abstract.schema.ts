import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class AbstractDocument {
  @ApiProperty({
    description: 'Unique identifier for the document',
    type: String,
  })
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @ApiProperty({
    description: 'The date and time when the document was created',
    type: Date,
  })
  @Prop({ type: Date, default: Date.now, required: false })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the document was last updated',
    type: Date,
  })
  @Prop({ type: Date, default: Date.now, required: false })
  updatedAt: Date;
}
