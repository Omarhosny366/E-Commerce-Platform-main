import { Controller, Inject, Post, Body, Patch, Delete,Param } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { DeleteItemDto } from './dto/delete-item.dto';
import { UserSingleton } from './userSingleton';

@Controller('cart')
export class CartController {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly cartService: CartService,
  ) {}

  @EventPattern('user.logged.in')
  async handleUserLoggedIn(@Payload() message) {
    let user;

    try {
      user = typeof message.value === 'string' ? JSON.parse(message.value) : message.value;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return;
    }

    console.log('User logged in:', user);

    // Store the user in the singleton
    const userSingleton = UserSingleton.getInstance();
    userSingleton.setCurrentUser(user);
  }

  @Post()
  async createCart(@Body() createCartDto: CreateCartDto) {
    try {
      return await this.cartService.createCart(createCartDto);
    } catch (error) {
      console.error('Error creating cart:', error);
      throw error;
    }
  }

  @Patch()
  async addToCart(@Body() addToCartDto: AddToCartDto) {
    try {
      return await this.cartService.addToCart(addToCartDto);
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  @Delete()
  async deleteCart() {
    try {
      await this.cartService.deleteCart();
    } catch (error) {
      console.error('Error deleting cart:', error);
      throw error;
    }
  }

  @Delete('item/:productId')
  async deleteItemFromCart(@Param('productId') productId: string) {
    return this.cartService.deleteItemFromCart(productId);
  }
}
