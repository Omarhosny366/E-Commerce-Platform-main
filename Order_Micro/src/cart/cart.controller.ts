import { Controller, Inject, Patch,Get, Delete, Param, Body, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { DeleteItemDto } from './dto/delete-item.dto';
import { UserSingleton } from './userSingleton';
import { ProductSingleton } from './productSingleton';
import { Cart, CartDocument } from './schemas/cart.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Controller('cart')
export class CartController {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly cartService: CartService,
    @InjectModel(Cart.name) private cartModel: Model<CartDocument> 

  ) {}

  async getCartByUserId(userId: string): Promise<Cart | null> {
    return this.cartModel.findOne({ userId }).exec();
  }

  @Get()
  async getCart(): Promise<Cart> {
    return this.cartService.getCartByUserId();
  }

  @EventPattern('user.logged.in')
  async handleUserLoggedIn(@Payload() message: any) {
    try {
      const user = typeof message.value === 'string' ? JSON.parse(message.value) : message.value;
      console.log('User logged in:', user);

      const userSingleton = UserSingleton.getInstance();
      userSingleton.setCurrentUser(user);
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }

  @EventPattern('product.created')
  async handleProductCreated(@Payload() message: any) {
    try {
      const productData = typeof message.value === 'string' ? JSON.parse(message.value) : message.value;
      console.log('Product created:', productData);

      const productSingleton = ProductSingleton.getInstance();
      productSingleton.setCurrentProduct(productData);

      console.log('Current product in singleton:', productSingleton.getCurrentProduct());
    } catch (error) {
      console.error('Error parsing product data:', error);
    }
  }
  @Patch()
async addToCart(@Body() addToCartDto: AddToCartDto) {
  console.log('Received DTO:', addToCartDto);

  const { productId, quantity, startDate, endDate, name } = addToCartDto;

  try {
    const parsedStartDate = startDate ? new Date(startDate) : undefined;
    const parsedEndDate = endDate ? new Date(endDate) : undefined;

    if ((startDate && isNaN(parsedStartDate.getTime())) || (endDate && isNaN(parsedEndDate.getTime()))) {
      throw new Error('Invalid date format');
    }

    const cart = await this.cartService.addToCart(
      productId,
      quantity,
      parsedStartDate,
      parsedEndDate,
      name
    );
    
    return cart;
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    throw new HttpException({
      status: HttpStatus.BAD_REQUEST,
      error: error.message || 'Bad Request',
    }, HttpStatus.BAD_REQUEST);
  }
}
  @Delete('item/:productId')
async deleteItemFromCart(@Param('productId') productId: string) {
  try {
    return await this.cartService.deleteItemFromCart(productId);
  } catch (error) {
    console.error('Error deleting item from cart:', error.message);
    throw new BadRequestException('Error deleting item from cart');
  }
}

  
}
