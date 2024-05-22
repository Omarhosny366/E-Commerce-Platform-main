import { Controller, Delete, Post, Param, Body, Put, NotFoundException, OnModuleInit, Inject } from '@nestjs/common';
import { CustRentProductService } from './cust-rent-product.service';
import { CreateCustRentProductDto } from './dto/create-cust-rent-product.dto';
import { UpdateCustRentProductDto } from './dto/update-cust-rent-product.dto';
import { ClientKafka, EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('customer-rent-products')
export class CustRentProductController implements OnModuleInit {
  @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka
  constructor(private readonly custRentProductService: CustRentProductService) {}
  
  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('update.product.quantity');
    await this.kafkaClient.connect();
  }

  @MessagePattern('update.product.quantity')
  async handleUpdateProductQuantity(@Payload() data: { productId: string; quantity: number }) {
    const { productId, quantity } = data;
    try {
      console.log(`Received request to update quantity for product ID: ${productId} to ${quantity}`);
      await this.custRentProductService.updateProductQuantity(productId, quantity);
    } catch (error) {
      console.error(`Error handling product quantity update request: ${error.message}`);
      throw error;
    }
  }
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



  @MessagePattern('get.product.price')
  async handleProductPriceRequest(@Payload() message) {
    try {
      const { productId } = message;
      if (!productId) {
        throw new Error('Invalid message format: productId is missing');
      }

      const productDetails = await this.custRentProductService.getProductDetails(productId);
      if (!productDetails) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      return { price: productDetails.price };
    } catch (error) {
      console.error('Error handling product price request:', error.message);
      throw error;
    }
  }

  @MessagePattern('get.product.type')
  async handleProductTypeRequest(@Payload() message) {
    try {
      const { productId } = message;
      if (!productId) {
        throw new Error('Invalid message format: productId is missing');
      }

      const productDetails = await this.custRentProductService.getProductDetails(productId);
      if (!productDetails) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      return { type: productDetails.type };
    } catch (error) {
      console.error('Error handling product type request:', error.message);
      throw error;
    }
  }

  @MessagePattern('get.product.dimm')
  async handleProductDimmRequest(@Payload() message) {
    try {
      const { productId } = message;
      if (!productId) {
        throw new Error('Invalid message format: productId is missing');
      }

      const productDetails = await this.custRentProductService.getProductDetails(productId);
      if (!productDetails) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      return { dimensions: productDetails.dimensions };
    } catch (error) {
      console.error('Error handling product dimensions request:', error.message);
      throw error;
    }
  }

  @MessagePattern('get.product.mat')
  async handleProductMatRequest(@Payload() message) {
    try {
      const { productId } = message;
      if (!productId) {
        throw new Error('Invalid message format: productId is missing');
      }

      const productDetails = await this.custRentProductService.getProductDetails(productId);
      if (!productDetails) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      return { material: productDetails.material };
    } catch (error) {
      console.error('Error handling product material request:', error.message);
      throw error;
    }
  }
  @MessagePattern('get.product.qua')
  async handleProductQuanRequest(@Payload() message) {
    try {
      const { productId } = message;
      if (!productId) {
        throw new Error('Invalid message format: productId is missing');
      }

      const productDetails = await this.custRentProductService.getProductDetails(productId);
      if (!productDetails) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      return { quantity: productDetails.quantity };
    } catch (error) {
      console.error('Error handling product material request:', error.message);
      throw error;
    }
  }

}