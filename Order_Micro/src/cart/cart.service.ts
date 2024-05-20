


import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ClientKafka } from '@nestjs/microservices';
import { Cart } from './schemas/cart.schema';
import { UserSingleton } from './userSingleton';

@Injectable()
export class CartService implements OnModuleInit {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('get.product.price');
    this.kafkaClient.subscribeToResponseOf('get.product.mat');
    this.kafkaClient.subscribeToResponseOf('get.product.type');
    this.kafkaClient.subscribeToResponseOf('get.product.dimm');

    await this.kafkaClient.connect();
  }

  private getCurrentUserId(): string {
    const userSingleton = UserSingleton.getInstance();
    const currentUser = userSingleton.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not logged in');
    }
    return currentUser.id;
  }

  async getProductPrice(productId: string): Promise<number> {
    console.log(`Requesting product price for ID: ${productId}`);
    try {
      const response = await this.kafkaClient.send('get.product.price', { productId }).toPromise();
      console.log(`Received product price: ${response.price}`);
      return response.price;
    } catch (error) {
      console.error('Error fetching product price:', error);
      throw new Error('Failed to fetch product price');
    }
  }
  async getProductType(productId: string): Promise<number> {
    console.log(`Requesting product price for ID: ${productId}`);
    try {
      const response = await this.kafkaClient.send('get.product.type', { productId }).toPromise();
      console.log(`Received product type: ${response.type}`);
      return response.type;
    } catch (error) {
      console.error('Error fetching product type:', error);
      throw new Error('Failed to fetch product type');
    }
  }
  async getProductmat(productId: string): Promise<number> {
    console.log(`Requesting product dim for ID: ${productId}`);
    try {
      const response = await this.kafkaClient.send('get.product.mat', { productId }).toPromise();
      console.log(`Received product type: ${response.material}`);
      return response.material;
    } catch (error) {
      console.error('Error fetching material type:', error);
      throw new Error('Failed to fetch material type');
    }
  }
  async getProductdimm(productId: string): Promise<number> {
    console.log(`Requesting product dim for ID: ${productId}`);
    try {
      const response = await this.kafkaClient.send('get.product.dimm', { productId }).toPromise();
      console.log(`Received product type: ${response.dimensions}`);
      return response.dimensions;
    } catch (error) {
      console.error('Error fetching dimensions type:', error);
      throw new Error('Failed to fetch dimensions type');
    }
  }

  async addToCart(productId: string, quantity: number): Promise<Cart> {
    const userId = this.getCurrentUserId();
    const productPrice = await this.getProductPrice(productId);
    const productType = await this.getProductType(productId);
    const productdim = await this.getProductmat(productId);
    const productdimm = await this.getProductdimm(productId);
  
    if (productPrice == null) {
      throw new Error('Product price not found');
    }
  
    let cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      cart = new this.cartModel({
        userId: userId,
        items: []
      });
    } else {
      if (cart.items.length > 0 && cart.items[0].type !== productType.toString()) {
        throw new Error(`Cart already has items of type clean it to add another type "${cart.items[0].type}"`);
      }
    }
  
    const itemIndex = cart.items.findIndex(item => item.product_id.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product_id: new Types.ObjectId(productId),
        quantity: quantity,
        price: productPrice,
        type: productType.toString(),
        material: productdim,
        dimensions: productdimm
      });
    }
  
    // Calculate total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  
    await cart.save();
    return cart;
  }
  

  async deleteItemFromCart(itemId: string): Promise<Cart> {
    const userId = this.getCurrentUserId();
    let cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new Error('Cart not found');
    }

    const itemIndex = cart.items.findIndex(item => item.product_id.toString() === itemId);
    if (itemIndex === -1) {
      throw new Error(`Item ID ${itemId} not found in cart`);
    }

    cart.items.splice(itemIndex, 1);

    if (cart.items.length === 0) {
      // Delete the cart if it has no items
      await this.cartModel.deleteOne({ userId });
      return null; // Return null to indicate that the cart was deleted
    }

    // Calculate total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    await cart.save();
    return cart;
  }
}