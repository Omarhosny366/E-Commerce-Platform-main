import { Controller, Delete, Post, Param, Body, Put } from '@nestjs/common';
import { SellerRentProductService } from './product-rent.service';
import { CreateSellerRentProductDto } from './dto/create-product-rent.dto';

@Controller('seller-rent-products')
export class SellerRentProductController {
  constructor(private readonly sellerRentProductService: SellerRentProductService) {}

  @Post()
  async createProduct(@Body() createSellerRentProductDto: CreateSellerRentProductDto): Promise<any> {
    try {
      const createdProduct = await this.sellerRentProductService.create(createSellerRentProductDto);
      return { success: true, data: createdProduct };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<any> {
    return this.sellerRentProductService.remove(id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateSellerRentProductDto: CreateSellerRentProductDto,
  ): Promise<any> {
    try {
      const updatedProduct = await this.sellerRentProductService.update(id, updateSellerRentProductDto);
      return { success: true, data: updatedProduct };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

}
