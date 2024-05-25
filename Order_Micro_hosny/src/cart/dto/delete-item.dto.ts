import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class DeleteItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
