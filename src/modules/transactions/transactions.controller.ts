import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ConfirmTransactionDto } from './dto/confirm-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly trxService: TransactionsService) {}

  /**
   * Create a new transaction.
   * @param dto - Data Transfer Object containing transaction details.
   * @returns The created transaction.
   */
  @Post()
  create(@Body() dto: CreateTransactionDto) {
    return this.trxService.createTransaction(dto);
  }

  /**
   * Confirm a transaction by its ID.
   * @param id - The ID of the transaction to confirm.
   * @param dto - Data Transfer Object containing confirmation details.
   * @returns The updated transaction.
   */
  @Patch(':id/confirm')
  confirm(@Param('id') id: string, @Body() dto: ConfirmTransactionDto) {
    return this.trxService.confirmTransaction(id, dto);
  }

  /**
   * Retrieve all transactions.
   * @returns An array of all transactions.
   */
  @Get()
  findAll() {
    return this.trxService.findAll();
  }

  /**
   * Retrieve a transaction by its ID.
   * @param id - The ID of the transaction to retrieve.
   * @returns The transaction with the specified ID.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trxService.findOne(id);
  }
}
