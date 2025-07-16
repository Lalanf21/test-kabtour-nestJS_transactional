import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './entities/transaction.entity';
import { TransactionItem } from './entities/transaction-item.entity';
import { Product } from './entities/product.entity';

/**
 * Module for managing transactions.
 * It imports TypeOrmModule for the Transaction and TransactionItem entities,
 * provides the TransactionsService, and registers the TransactionsController.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Transaction, TransactionItem, Product])],
  providers: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
