import { Controller, Inject, Patch, Delete, Param, Body, BadRequestException } from '@nestjs/common';
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
    try {
      return await this.cartService.addToCart(addToCartDto.productId, addToCartDto.quantity);
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
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
  // @Delete()
  // async deleteCart() {
  //   try {
  //     await this.cartService.deleteCart();
  //   } catch (error) {
  //     console.error('Error deleting cart:', error.message);
  //     throw new BadRequestException('Error deleting cart');
  //   }
  // }

  // @Delete('item/:productId')
  // async deleteItemFromCart(@Param('productId') productId: string, @Body() deleteItemDto: DeleteItemDto) {
  //   deleteItemDto.productId = productId;
  //   try {
  //     return await this.cartService.deleteItemFromCart(deleteItemDto);
  //   } catch (error) {
  //     console.error('Error deleting item from cart:', error.message);
  //     throw new BadRequestException('Error deleting item from cart');
  //   }
  // }
}
