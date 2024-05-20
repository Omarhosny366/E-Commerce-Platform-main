import { Controller, Inject, Patch, Delete, Param, Body, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { DeleteItemDto } from './dto/delete-item.dto';
import { UserSingleton } from './userSingleton';
import { ProductSingleton } from './productSingleton';

@Controller('cart')
export class CartController {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly cartService: CartService,
  ) {}

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

      try {
          const startDate = addToCartDto.startDate ? new Date(addToCartDto.startDate) : undefined;
          const endDate = addToCartDto.endDate ? new Date(addToCartDto.endDate) : undefined;
          const cart = await this.cartService.addToCart(
              addToCartDto.productId,
              addToCartDto.quantity,
              startDate,
              endDate
          );
          return cart;
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
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
