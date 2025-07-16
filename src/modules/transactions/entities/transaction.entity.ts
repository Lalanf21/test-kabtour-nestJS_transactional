import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { TransactionItem } from './transaction-item.entity';

/**
 * Entity representing a transaction.
 * It includes the customer ID, status, reason for rejection, creation date, and associated items.
 */
@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn({name: 'id'})
  id: string;

  @Column({ name: 'customer_id' })
  customerId: string;

  @Column({ name: 'status', default: 'pending' })
  status: 'pending' | 'accepted' | 'rejected';

  @Column({ name: 'reason', nullable: true })
  reason?: string;

  @CreateDateColumn( {name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => TransactionItem, item => item.transaction, { cascade: true })
  items: TransactionItem[];
}
