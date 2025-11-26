import { Controller, Get } from '@nestjs/common';
import { TablesService } from './tables.service';
import { ITable } from './interface/ITable';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Get()
  async findAll(): Promise<ITable[]> {
    return this.tablesService.findAll();
  }
}
