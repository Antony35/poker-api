import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({collection: 'users_collection', versionKey: false})
export class Users {

  @Prop({required: true})
  username: string;

  @Prop({required: true})
  password: string;

  @Prop({default: 1000})
  chips: number;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
