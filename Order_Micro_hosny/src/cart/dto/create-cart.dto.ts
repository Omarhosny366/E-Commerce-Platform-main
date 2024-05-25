import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateCartDto {
  @IsString()
  userId: string;

  @IsArray()
  product_ids: string[];

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}
