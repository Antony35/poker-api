import {Injectable } from '@nestjs/common';
import { ITable } from './interface/ITable';
import { Table } from './schemas/table.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TablesService {

  constructor(
    @InjectModel(Table.name) private readonly tableModel: Model<ITable>) {}

  async findAll(): Promise<ITable[]> {
    return await this.tableModel.find().exec()
  }
}