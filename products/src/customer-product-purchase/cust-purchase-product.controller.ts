import { Controller, Delete, Post, Param, Body, Put, NotFoundException, OnModuleInit, Inject, Get } from '@nestjs/common';
import { CustPurchaseProductService } from './cust-purchase-product.service';
import { CreateCustPurchaseProductDto } from './dto/create-cust-purchase-product.dto';
import { UpdateCustPurchaseProductDto } from './dto/update-cust-purchase-product.dto';
import { ClientKafka, EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CustPurchaseProduct } from './schemas/cust-purchase-product.schema';

@Controller('customer-purchase-products')
export class CustPurchaseProductController implements OnModuleInit {
  @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka 
  constructor(private readonly custPurchaseProductService: CustPurchaseProductService) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('update.product.quantity');
    await this.kafkaClient.connect();
  }

  @MessagePattern('update.product.quantity')
  async handleUpdateProductQuantity(@Payload() data: { productId: string; quantity: number }) {
    const { productId, quantity } = data;
    try {
      console.log(`Received request to update quantity for product ID: ${productId} to ${quantity}`);
      await this.custPurchaseProductService.updateProductQuantity(productId, quantity);
    } catch (error) {
      console.error(`Error handling product quantity update request: ${error.message}`);
      throw error;
    }
  }

  @MessagePattern('get.product.name')
  async handleProductNameRequest(@Payload() message) {
    try {
      const { productId } = message;
      if (!productId) {
        throw new Error('Invalid message format: productId is missing');
      }

      const productDetails = await this.custPurchaseProductService.getProductDetails(productId);
      if (!productDetails) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      return { name: productDetails.name };
    } catch (error) {
      console.error('Error handling product price request:', error.message);
      throw error;
    }
  }



  @Get(':id')
  async getProductDetails(@Param('id') id: string): Promise<CustPurchaseProduct> {
    return this.custPurchaseProductService.getProductDetails(id);
  }

  @Get()
  async getAllProducts(): Promise<CustPurchaseProduct[]> {
    return this.custPurchaseProductService.getAllProducts();
  }
  
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

  
  @MessagePattern('get.product.pricee')
  async handleProductPriceRequest(@Payload() message) {
    try {
      const { productId } = message;
      if (!productId) {
        throw new Error('Invalid message format: productId is missing');
      }

      const productDetails = await this.custPurchaseProductService.getProductDetails(productId);
      if (!productDetails) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      return { price: productDetails.price };
    } catch (error) {
      console.error('Error handling product price request:', error.message);
      throw error;
    }
  }

  @MessagePattern('get.product.typee')
  async handleProductTypeRequest(@Payload() message) {
    try {
      const { productId } = message;
      if (!productId) {
        throw new Error('Invalid message format: productId is missing');
      }

      const productDetails = await this.custPurchaseProductService.getProductDetails(productId);
      if (!productDetails) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      return { type: productDetails.type };
    } catch (error) {
      console.error('Error handling product type request:', error.message);
      throw error;
    }
  }

  @MessagePattern('get.product.dimmm')
  async handleProductDimmRequest(@Payload() message) {
    try {
      const { productId } = message;
      if (!productId) {
        throw new Error('Invalid message format: productId is missing');
      }

      const productDetails = await this.custPurchaseProductService.getProductDetails(productId);
      if (!productDetails) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      return { dimensions: productDetails.dimensions };
    } catch (error) {
      console.error('Error handling product dimensions request:', error.message);
      throw error;
    }
  }

  @MessagePattern('get.product.matt')
  async handleProductMatRequest(@Payload() message) {
    try {
      const { productId } = message;
      if (!productId) {
        throw new Error('Invalid message format: productId is missing');
      }

      const productDetails = await this.custPurchaseProductService.getProductDetails(productId);
      if (!productDetails) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      return { material: productDetails.material };
    } catch (error) {
      console.error('Error handling product material request:', error.message);
      throw error;
    }
  }
  @MessagePattern('get.product.quaa')
  async handleProductquaRequest(@Payload() message) {
    try {
      const { productId } = message;
      if (!productId) {
        throw new Error('Invalid message format: productId is missing');
      }

      const productDetails = await this.custPurchaseProductService.getProductDetails(productId);
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
