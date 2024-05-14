import { Controller, Delete, Post, Param, Body, Put, NotFoundException } from '@nestjs/common';
import { CustRentProductService } from './cust-rent-product.service';
import { CreateCustRentProductDto } from './dto/create-cust-rent-product.dto';
import { UpdateCustRentProductDto } from './dto/update-cust-rent-product.dto';

@Controller('customer-rent-products')
export class CustRentProductController {
  constructor(private readonly custRentProductService: CustRentProductService) {}

  @Post()
  async createProduct(@Body() createCustRentProductDto: CreateCustRentProductDto): Promise<any> {
    try {
      const createdProduct = await this.custRentProductService.create(createCustRentProductDto);
      return { success: true, data: createdProduct };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<any> {
    try {
      await this.custRentProductService.delete(id);
      return { success: true, message: `Product with id ${id} deleted successfully` };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateCustRentProductDto: UpdateCustRentProductDto,
  ): Promise<any> {
    try {
      // Find the product by ID
      const existingProduct = await this.custRentProductService.findOne(id);
      if (!existingProduct) {
        throw new NotFoundException('Product not found');
      }
  
      // Update the product's properties
      Object.assign(existingProduct, updateCustRentProductDto);
  
      // Save the updated product
      const updatedProduct = await this.custRentProductService.save(existingProduct);
  
      return { success: true, data: updatedProduct };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
