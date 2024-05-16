import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './schemas/cart.schema';
import { CreateCartDto } from './dto/create-cart.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { DeleteItemDto } from './dto/delete-item.dto';
import { UserSingleton } from './userSingleton';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private readonly cartModel: Model<Cart>) {}

  private getCurrentUserId(): string {
    const userSingleton = UserSingleton.getInstance();
    const currentUser = userSingleton.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not logged in');
    }
    return currentUser.id;
  }

  async createCart(createCartDto: CreateCartDto): Promise<Cart> {
    const userId = this.getCurrentUserId();
    createCartDto.userId = userId;
    const createdCart = new this.cartModel(createCartDto);
    return createdCart.save();
  }

  async addToCart(addToCartDto: AddToCartDto): Promise<Cart> {
    const userId = this.getCurrentUserId();
    const cart = await this.cartModel.findOne({ userId });
    if (cart) {
      cart.product_ids.push(addToCartDto.productId);
      cart.quantity += addToCartDto.quantity;
      return cart.save();
    }
    // If no cart found, create a new cart
    const newCart: CreateCartDto = {
      product_ids: [addToCartDto.productId],
      price: 0, // Update as necessary
      quantity: addToCartDto.quantity,
      userId,
    };
    return this.createCart(newCart);
  }

  async deleteCart(): Promise<void> {
    const userId = this.getCurrentUserId();
    await this.cartModel.deleteOne({ userId });
  }

  async deleteItemFromCart(productId: string): Promise<Cart> {
    const userId = this.getCurrentUserId();
    const cart = await this.cartModel.findOne({ userId });
    if (!cart) {
      throw new Error('Cart not found');
    }

    const originalLength = cart.product_ids.length;
    cart.product_ids = cart.product_ids.filter(id => id.toString() !== productId.toString());

    if (cart.product_ids.length === originalLength) {
      throw new Error(`Product ID ${productId} not found in cart`);
    }

    return cart.save();
  }
}
