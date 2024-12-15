import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { LIST_TYPES } from 'src/constants/constants';

export type ListDocument = List & Document;

@Schema()
export class List {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  movieOrShowId: Types.ObjectId;

  @Prop({ required: true, enum: [LIST_TYPES.MOVIES, LIST_TYPES.TVSHOW] })
  type: 'movie' | 'tvshow';
}

export const ListSchema = SchemaFactory.createForClass(List);
