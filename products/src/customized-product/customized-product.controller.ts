import { Controller, Delete, Post, Param, Body, Put, NotFoundException } from '@nestjs/common';
import { CustomizedProductService } from './customized-product.service';
import { CreateCustomizedProductDto } from './dto/create-customized-product.dto';
import { UpdateCustomizedProductDto } from './dto/update-customized-product.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UserSingleton } from './userSingleton';

@Controller('customized-products')
export class CustomizedProductController {
  constructor(private readonly customizedProductService: CustomizedProductService) {}

  @EventPattern('user.logged.in')
async handleUserLoggedIn(@Payload() message: any) {
  try {
    const user = message; 
    console.log('Parsed user:', user);

    const userSingleton = UserSingleton.getInstance();
    userSingleton.setCurrentUser(user);

    console.log('User logged in:', userSingleton.getCurrentUser());
  } catch (error) {
    console.error('Error parsing user data:', error);
  }
}


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
      const existingProduct = await this.customizedProductService.findOne(id);
      if (!existingProduct) {
        throw new NotFoundException('Product not found');
      }

      Object.assign(existingProduct, updateCustomizedProductDto);

      const updatedProduct = await this.customizedProductService.save(existingProduct);

      return { success: true, data: updatedProduct };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }


  @MessagePattern('get.product.price.cus')
  async handleProductPriceRequest(@Payload() message) {
    try {
      const { productId } = message;
      if (!productId) {
        throw new Error('Invalid message format: productId is missing');
      }

      const productDetails = await this.customizedProductService.getProductDetails(productId);
      if (!productDetails) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      return { price: productDetails.price };
    } catch (error) {
      console.error('Error handling product price request:', error.message);
      throw error;
    }
  }

  @MessagePattern('get.product.type.cus')
  async handleProductTypeRequest(@Payload() message) {
    try {
      const { productId } = message;
      if (!productId) {
        throw new Error('Invalid message format: productId is missing');
      }

      const productDetails = await this.customizedProductService.getProductDetails(productId);
      if (!productDetails) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      return { type: productDetails.type };
    } catch (error) {
      console.error('Error handling product type request:', error.message);
      throw error;
    }
  }

  @MessagePattern('get.product.dimm.cus')
  async handleProductDimmRequest(@Payload() message) {
    try {
      const { productId } = message;
      if (!productId) {
        throw new Error('Invalid message format: productId is missing');
      }

      const productDetails = await this.customizedProductService.getProductDetails(productId);
      if (!productDetails) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      return { dimensions: productDetails.dimensions };
    } catch (error) {
      console.error('Error handling product dimensions request:', error.message);
      throw error;
    }
  }

  @MessagePattern('get.product.mat.cus')
  async handleProductMatRequest(@Payload() message) {
    try {
      const { productId } = message;
      if (!productId) {
        throw new Error('Invalid message format: productId is missing');
      }

      const productDetails = await this.customizedProductService.getProductDetails(productId);
      if (!productDetails) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      return { material: productDetails.material };
    } catch (error) {
      console.error('Error handling product material request:', error.message);
      throw error;
    }
  }
}
