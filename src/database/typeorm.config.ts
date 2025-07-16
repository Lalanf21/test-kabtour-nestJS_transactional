import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { TransactionItem } from '../modules/transactions/entities/transaction-item.entity';
import { Transaction } from '../modules/transactions/entities/transaction.entity';
import { Product } from '../modules/transactions/entities/product.entity';

dotenv.config();

// handle missing DATABASE_URL environment variable
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not defined');
}
const dbUrl = new URL(process.env.DATABASE_URL);

// set up TypeORM configuration
// using the parsed URL components
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: dbUrl.hostname,
  port: Number(dbUrl.port),
  username: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.replace('/', ''),
  entities: [Transaction, TransactionItem, Product],
  synchronize: false,
  migrations: ['dist/migrations/*.js'],
  logging: process.env.NODE_ENV !== 'production',
};
