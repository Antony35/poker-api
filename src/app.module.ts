import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TablesModule } from './tables/tables.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot("mongodb://marcel:123_soleil@localhost:27017/poker_db"),
    TablesModule
  ],
})

export class AppModule {}
