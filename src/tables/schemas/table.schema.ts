import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({collection: 'tables_collection'})
export class Table {

  @Prop({required: true})
  smallBlind: number;

  @Prop({required: true})
  bigBling: number;

  @Prop({required: true})
  name: string;
}

export const TableSchema = SchemaFactory.createForClass(Table);
