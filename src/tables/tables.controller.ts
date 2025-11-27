import { Controller, Get, Param, Put, Query, Request } from '@nestjs/common';
import { TablesService } from './tables.service';
import { ITable } from './interface/ITable';
import { ApiBearerAuth } from '@nestjs/swagger';
import type { SessionRequest } from '../auth/interface/IRequestUser';
import { IGameTable } from './interface/IGameTable';

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

  @Get('/leave')
  async leaveTable(@Request() req: SessionRequest) {
    return await this.tablesService.leaveTable(req.user.username)
  }

  @Put('/play')
  async play(@Request() req: SessionRequest, @Query('bet') bet: number, @Query('fold') fold: boolean): Promise<IGameTable | void> {

    const gameTable = await this.tablesService.findTable(req.user.username)
    if (!gameTable.turnStarted) {
      return await this.tablesService.play(gameTable, bet, fold);
    }
  }
}
