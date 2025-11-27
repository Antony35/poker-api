import { Controller, Get, Param, Put, Request } from '@nestjs/common';
import { TablesService } from './tables.service';
import { ITable } from './interface/ITable';
import { ApiBearerAuth } from '@nestjs/swagger';
import type { SessionRequest } from '../auth/interface/IRequestUser';



@ApiBearerAuth()
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Get()
  async findAll(): Promise<ITable[]> {
    return this.tablesService.findAll();
  }

  @Put('/join/:name')
  async joinTable(@Param('name') name: string, @Request() req: SessionRequest): Promise<ITable> {
    return await this.tablesService.joinTable(name, req.user.username)
  }
}
