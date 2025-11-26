import { Connection } from 'mongoose';
import { TableSchema } from './schemas/table.schema';
import { DATABASE_CONNECTION, TABLE_MODEL } from '../constants';

export const tablesProviders = [
  {
    provide: TABLE_MODEL,
    useFactory: (connection: Connection) => connection.model('Table', TableSchema),
    inject: [DATABASE_CONNECTION],
  },
];
