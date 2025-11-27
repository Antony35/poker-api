import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TablesModule } from './tables/tables.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_INITDB_USER}:${process.env.MONGO_INITDB_PWD}@localhost:27017/${process.env.MONGO_INITDB_DATABASE}`),
    TablesModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})

export class AppModule {}
