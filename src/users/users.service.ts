import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './schemas/user.schemas';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interface/IUser';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<IUser>) {}

  async findOne(username: string): Promise<IUser | null> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async create(username: string, hash: string): Promise<IUser> {
    const createUserDto = {
      username: username,
      password: hash,
    }
    return await this.userModel.create(createUserDto);
  }
}
