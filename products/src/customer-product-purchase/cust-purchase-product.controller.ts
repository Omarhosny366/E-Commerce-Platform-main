import { Controller, Delete, Post, Param, Body, Put, NotFoundException } from '@nestjs/common';
import { CustPurchaseProductService } from './cust-purchase-product.service';
import { CreateCustPurchaseProductDto } from './dto/create-cust-purchase-product.dto';
import { UpdateCustPurchaseProductDto } from './dto/update-cust-purchase-product.dto';

@Controller('customer-purchase-products')
export class CustPurchaseProductController {
  constructor(private readonly custPurchaseProductService: CustPurchaseProductService) {}

  @Post()
  async createProduct(@Body() createCustPurchaseProductDto: CreateCustPurchaseProductDto): Promise<any> {
    try {
      const createdProduct = await this.custPurchaseProductService.create(createCustPurchaseProductDto);
      return { success: true, data: createdProduct };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<any> {
    try {
      await this.custPurchaseProductService.delete(id);
      return { success: true, message: `Product with id ${id} deleted successfully` };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateCustPurchaseProductDto: UpdateCustPurchaseProductDto,
  ): Promise<any> {
    try {
      const existingProduct = await this.custPurchaseProductService.findOne(id);
      if (!existingProduct) {
        throw new NotFoundException('Product not found');
      }

      Object.assign(existingProduct, updateCustPurchaseProductDto);

      const updatedProduct = await this.custPurchaseProductService.save(existingProduct);

      return { success: true, data: updatedProduct };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
