import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Transaction } from './transaction.entity';
import { Product } from './product.entity';

/**
 * Entity representing an item in a transaction.
 * It includes the product ID, transaction ID, and quantity of the product.
 */
@Entity('transaction_items')
export class TransactionItem {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'product_id' })
  productId: string;

  @Column({ name: 'transactionId' })
  transactionId: string;

  @Column({ name: 'quantity' })
  quantity: number;

  @ManyToOne(() => Transaction, transaction => transaction.id)
  transaction: Transaction;

  @OneToOne(() => Product, product => product.id)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
