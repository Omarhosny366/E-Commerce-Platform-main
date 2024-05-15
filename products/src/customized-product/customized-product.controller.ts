import { Controller, Delete, Post, Param, Body, Put, NotFoundException } from '@nestjs/common';
import { CustomizedProductService } from './customized-product.service';
import { CreateCustomizedProductDto } from './dto/create-customized-product.dto';
import { UpdateCustomizedProductDto } from './dto/update-customized-product.dto';

@Controller('customized-products')
export class CustomizedProductController {
    constructor(private readonly customizedProductService: CustomizedProductService) {}

    @Post()
    async createProduct(@Body() createCustomizedProductDto: CreateCustomizedProductDto): Promise<any> {
        try {
            const createdProduct = await this.customizedProductService.create(createCustomizedProductDto);
            return { success: true, data: createdProduct };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<any> {
        try {
            await this.customizedProductService.delete(id);
            return { success: true, message: `Product with id ${id} deleted successfully` };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    @Put(':id')
    async updateProduct(
        @Param('id') id: string,
        @Body() updateCustomizedProductDto: UpdateCustomizedProductDto,
    ): Promise<any> {
        try {
            // Find the product by ID
            const existingProduct = await this.customizedProductService.findOne(id);
            if (!existingProduct) {
                throw new NotFoundException('Product not found');
            }
    
            // Update the product's properties
            Object.assign(existingProduct, updateCustomizedProductDto);
    
            // Save the updated product
            const updatedProduct = await this.customizedProductService.save(existingProduct);
    
            return { success: true, data: updatedProduct };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}
