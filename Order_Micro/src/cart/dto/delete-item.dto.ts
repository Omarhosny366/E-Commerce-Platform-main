import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
