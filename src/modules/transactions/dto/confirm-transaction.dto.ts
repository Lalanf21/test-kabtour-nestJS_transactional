import { IsIn, IsOptional, IsString } from 'class-validator';

/**
 * DTO for confirming a transaction.
 * It includes the status of the transaction and an optional reason for rejection.
 */
export class ConfirmTransactionDto {
  @IsIn(['accepted', 'rejected'])
  status: 'accepted' | 'rejected';

  @IsOptional()
  @IsString()
  reason?: string;
}
