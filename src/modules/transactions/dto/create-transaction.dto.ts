import { Type } from 'class-transformer';
import { IsArray, IsUUID, Min, ValidateNested } from 'class-validator';

/**
 * DTO for creating a transaction.
 * It includes the customer ID and an array of products with their quantities.
 */

class ProductDto {
  @IsUUID()
  productId: string;

  @Min(1)
  quantity: number;
}

export class CreateTransactionDto {
  @IsUUID()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}
