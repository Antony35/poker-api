import { Module } from '@nestjs/common';
import { TablesController } from './tables.controller';
import { TablesService } from './tables.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Table, TableSchema } from './schemas/table.schema';
import { Users, UsersSchema } from '../users/schemas/user.schemas';
import { DeckService } from '../deck/deck.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Table.name,
        schema: TableSchema,
      },
      {
        name: Users.name,
        schema: UsersSchema,
      }
    ]),
  ],
  controllers: [TablesController],
  providers: [TablesService, DeckService],
  exports: [TablesService],
})
export class TablesModule {}
