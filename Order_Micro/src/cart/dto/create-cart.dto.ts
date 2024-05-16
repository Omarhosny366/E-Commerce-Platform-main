import { IsNotEmpty, IsArray, IsNumber, IsString } from 'class-validator';

export class CreateCartDto {
  @IsArray()
  @IsNotEmpty()
  product_ids: string[];

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
