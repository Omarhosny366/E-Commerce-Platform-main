import { Controller, Delete, Post, Param, Body, Put, NotFoundException } from '@nestjs/common';
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
    try {
      await this.sellerRentProductService.remove(id);
      return { success: true, message: `Product with id ${id} deleted successfully` };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateSellerRentProductDto: CreateSellerRentProductDto,
  ): Promise<any> {
    try {
      // Find the product by ID
      const existingProduct = await this.sellerRentProductService.findOne(id);
      if (!existingProduct) {
        throw new NotFoundException('Product not found');
      }
  
      // Update the product's properties
      Object.assign(existingProduct, updateSellerRentProductDto);
  
      // Save the updated product
      const updatedProduct = await this.sellerRentProductService.save(existingProduct);
  
      return { success: true, data: updatedProduct };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  

}
