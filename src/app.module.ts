import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TablesModule } from './tables/tables.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://marcel:123_soleil@localhost:27017/poker_db"),
    ConfigModule.forRoot(),
    TablesModule,
    AuthModule,
  ],
})

export class AppModule {}
