import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionItem } from './entities/transaction-item.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ConfirmTransactionDto } from './dto/confirm-transaction.dto';
import { Product } from './entities/product.entity';
import { In } from 'typeorm';

@Injectable()
/**
 * Service for managing transactions.
 * It handles creating, confirming, and retrieving transactions.
 */
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,

    @InjectRepository(TransactionItem)
    private transactionItemRepo: Repository<TransactionItem>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  /**
   * Create a new transaction.
   * @param dto - Data Transfer Object containing transaction details.
   * @returns The created transaction.
   */
  async createTransaction(dto: CreateTransactionDto) {
    
    // Validate input
    if (!dto.customerId || !dto.products || dto.products.length === 0) {
      throw new BadRequestException('Invalid transaction data');
    }

    // Check if products exist and have sufficient stock
    if (!dto.products || dto.products.length === 0) {
      throw new BadRequestException('No products provided');
    }

    // Check if each product exists and has sufficient stock
    const productIds = dto.products.map(p => p.productId);

    // get dall product from database
    const products = await this.productRepo.findBy({
      id: In(productIds),
    });
    const productMap = new Map(products.map(p => [p.id, p]));

    // check if all products exist
    const missing = productIds.filter(id => !productMap.has(id));
    if (missing.length > 0) {
      throw new BadRequestException(`Produk berikut tidak ditemukan: ${missing.join(', ')}`);
    }

    // check if stock is sufficient
    for (const item of dto.products) {
      const product = productMap.get(item.productId);
      if (product && product.stock < item.quantity) {
        throw new BadRequestException(
          `Stok produk "${product.name}" tidak mencukupi. Tersedia: ${product.stock}, diminta: ${item.quantity}`
        );
      }
    }

    // decrement stock
    for (const item of dto.products) {
      const product = productMap.get(item.productId);
      if (!product) continue; // Skip if product not found
      product.stock -= item.quantity;
      await this.productRepo.save(product);
    }

    // Create transaction and its items
    const transaction = this.transactionRepo.create({
      customerId: dto.customerId,
      items: dto.products.map(p => this.transactionItemRepo.create(p)),
    });

    return this.transactionRepo.save(transaction);
  }

  /**
   * Confirm a transaction by its ID.
   * @param id - The ID of the transaction to confirm.
   * @param dto - Data Transfer Object containing confirmation details.
   * @returns The updated transaction.
   */
  async confirmTransaction(id: string, dto: ConfirmTransactionDto) {
    const trx = await this.transactionRepo.findOne({ where: { id } });
    if (!trx) throw new NotFoundException('Transaction not found');
    if (trx.status !== 'pending') throw new BadRequestException('Already confirmed');

    trx.status = dto.status;
    trx.reason = dto.reason;
    return this.transactionRepo.save(trx);
  }

  /**
   * Retrieve all transactions.
   * @returns An array of all transactions.
   */
  async findAll() {
    return this.transactionRepo.find({ relations: ['items'] });
  }

  /**
   * Retrieve a transaction by its ID.
   * @param id - The ID of the transaction to retrieve.
   * @returns The transaction with the specified ID.
   */
  async findOne(id: string) {
    const trx = await this.transactionRepo.findOne({ where: { id }, relations: ['items'] });
    if (!trx) throw new NotFoundException('Transaction not found');
    return trx;
  }
}
