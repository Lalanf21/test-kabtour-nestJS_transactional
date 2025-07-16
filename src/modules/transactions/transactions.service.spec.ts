import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionItem } from './entities/transaction-item.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ConfirmTransactionDto } from './dto/confirm-transaction.dto';

// Test suite for TransactionsService
// It tests the creation of transactions, confirmation of transactions, and retrieval of transactions.
describe('TransactionsService', () => {
  let service: TransactionsService;
  let transactionRepo: Repository<Transaction>;
  let transactionItemRepo: Repository<TransactionItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(TransactionItem),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    transactionRepo = module.get(getRepositoryToken(Transaction));
    transactionItemRepo = module.get(getRepositoryToken(TransactionItem));
  });

  it('should create a transaction', async () => {
    const dto: CreateTransactionDto = {
      customerId: 'cust-uuid',
      products: [
        { productId: 'prod-1', quantity: 1 },
        { productId: 'prod-2', quantity: 2 },
      ],
    };

    const createdTransaction = { id: 'trx-id', ...dto, items: [] };
    jest.spyOn(transactionRepo, 'create').mockReturnValue(createdTransaction as any);
    jest.spyOn(transactionRepo, 'save').mockResolvedValue(createdTransaction as any);
    jest.spyOn(transactionItemRepo, 'create').mockImplementation(item => item as TransactionItem);

    const result = await service.createTransaction(dto);
    expect(result).toEqual(createdTransaction);
    expect(transactionRepo.create).toHaveBeenCalled();
    expect(transactionRepo.save).toHaveBeenCalled();
  });

  it('should throw if transaction not found when confirming', async () => {
    jest.spyOn(transactionRepo, 'findOne').mockResolvedValue(null);

    await expect(service.confirmTransaction('invalid-id', {
      status: 'accepted',
    } as ConfirmTransactionDto)).rejects.toThrow('Transaction not found');
  });

  it('should confirm transaction status', async () => {
    const trx = { id: 'trx-1', status: 'pending', reason: null };
    jest.spyOn(transactionRepo, 'findOne').mockResolvedValue(trx as any);
    jest.spyOn(transactionRepo, 'save').mockResolvedValue({
      ...trx,
      status: 'accepted',
    } as any);

    const result = await service.confirmTransaction('trx-1', {
      status: 'accepted',
    });

    expect(result.status).toBe('accepted');
    expect(transactionRepo.save).toHaveBeenCalled();
  });
});
