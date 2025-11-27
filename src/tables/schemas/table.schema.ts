import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({collection: 'tables_collection'})
export class Table {

  @Prop({required: true})
  small_blind: number;

  @Prop({required: true})
  big_blind: number;

  @Prop({required: true})
  name: string;
}

export const TableSchema = SchemaFactory.createForClass(Table);
