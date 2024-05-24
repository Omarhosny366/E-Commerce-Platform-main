import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductDetailsDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  dimensions: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  material: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  start_date: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsString()
  @IsNotEmpty()
  end_date: string;
}
// dto/add-to-cart.dto.ts

export class AddToCartDto {
  @IsString()
  productId: string;

  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

 
}
