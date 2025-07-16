import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { TransactionItem } from './transaction-item.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  stock: number;

//   @OneToOne(() => TransactionItem, item => item.productId)
//   transactionItem: TransactionItem;
}
