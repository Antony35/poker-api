import { Document } from 'mongoose';

export interface ITable extends Document {
  readonly bigBlind: number;
  readonly smallBlind: number;
  readonly name: string;
}