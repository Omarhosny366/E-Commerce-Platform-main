import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schema/order.schema';
import { ClientKafka } from '@nestjs/microservices';
import { CartService } from 'src/cart/cart.service';
import { UserSingleton } from 'src/cart/userSingleton';
import * as nodemailer from 'nodemailer';

@Injectable()
export class OrderService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel('Order') private orderModel: Model<OrderDocument>,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly cartService: CartService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'seelaz.info@gmail.com',
        pass: 'avjb zwyp algo dlpy',
      },
    });
  }

  private async isGuestUser() {
    let userSingleton = UserSingleton.getInstance();
    let currentUser = userSingleton.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not logged in');
    }
    let role = currentUser.role;
    if (role == "guest") {
      throw new Error('You have to login first to place an order');
    }
  }

  private getCurrentUserId(): string {
    let userSingleton = UserSingleton.getInstance();
    let currentUser = userSingleton.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not logged in');
    }
    return currentUser.id;
  }

  private getCurrentUserEmail(): string {
    let userSingleton = UserSingleton.getInstance();
    let currentUser = userSingleton.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not logged in');
    }
    return currentUser.email;
  }

  async getAddressDetails(addressId: string): Promise<any> {
    console.log(`Requesting Address for ID: ${addressId}`);
    try {
      const response = await this.kafkaClient.send('get.address', { addressId }).toPromise();
      console.log('Received Address Details:', response);
      return response;
    } catch (error) {
      console.error('Error fetching address details:', error);
      throw new Error('Failed to fetch address details');
    }
  }

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('get.product.qua');
    this.kafkaClient.subscribeToResponseOf('get.product.quaa');
    this.kafkaClient.subscribeToResponseOf('get.product.qua.cus');
    this.kafkaClient.subscribeToResponseOf('get.address');
    this.kafkaClient.subscribeToResponseOf('update.product.quantity');
    await this.kafkaClient.connect();
  }

  async getProductQuantity(productId: string): Promise<number> {
    console.log(`Requesting product quantity for ID: ${productId}`);
    try {
      const response = await this.kafkaClient.send('get.product.qua', { productId }).toPromise();
      console.log(`Received product quantity: ${response.quantity}`);
      return response.quantity;
    } catch (error) {
      console.error('Error fetching product quantity from rent service:', error);
      try {
        const response2 = await this.kafkaClient.send('get.product.quaa', { productId }).toPromise();
        console.log(`Received product quantity from purchase service: ${response2.quantity}`);
        return response2.quantity;
      } catch (error2) {
        console.error('Error fetching product quantity from purchase service:', error2);
        try {
          const response3 = await this.kafkaClient.send('get.product.qua.cus', { productId }).toPromise();
          console.log(`Received product quantity from custom purchase service: ${response3.quantity}`);
          return response3.quantity;
        } catch (error3) {
          console.error('Error fetching product quantity from custom purchase service:', error3);
          throw new Error('Product quantity not found');
        }
      }
    }
  }

//   async updateProductQuantity(productId: string, quantity: number): Promise<void> {
//     try {
//       await this.kafkaClient.send('update.product.quantity', { productId, quantity }).toPromise();
//       console.log(`Updated product quantity for ID: ${productId} to ${quantity}`);
//     } catch (error) {
//       console.error(`Error updating product quantity for ID: ${productId}`, error);
//       throw new Error('Failed to update product quantity');
//     }
// }

  async placeOrder(addressId: string): Promise<OrderDocument> {
    await this.isGuestUser(); // Correctly call and wait for the guest check
    
    const userId = this.getCurrentUserId();
    const email = this.getCurrentUserEmail();
    const address = await this.getAddressDetails(addressId);
    const cart = await this.cartService.getCartByUserId();

    const startDate = cart.startDate;
    const endDate = cart.endDate;

    // Update quantities for each product in the cart
    for (const item of cart.items) {
        const productId = item.product_id.toString();
      const currentQuantity = await this.getProductQuantity(productId);
      const newQuantity = currentQuantity - item.quantity;
      // await this.updateProductQuantity(productId, newQuantity);
    }

    // Create new order with the same ID as the cart
    const newOrder = new this.orderModel({
      _id: cart._id, // Setting order ID to be the same as the cart ID
      userId,
      address,
      items: cart.items,
      total: cart.totalPrice,
      downpayment: cart.downpayment,
      status: 'Placed',
      createdAt: new Date(),
      startDate: startDate,
      endDate: endDate,
    });

    // Save the order to the database
    const order = await newOrder.save();

    // Detailed order and address information
    const addressDetails = `
    Building Number: ${address.buildingNumber}
    Building Type: ${address.buildingType}
    City: ${address.city}
    Flat Number: ${address.flatNumber}
    Floor: ${address.floor}
    Street: ${address.street}`;

    const itemDetails = cart.items.map(item => `
    Quantity: ${item.quantity}
    Price: ${item.price}`).join('\n');

    const orderDetails = `
    Order ID: ${order._id}
    Total: ${order.total}
    Address: ${addressDetails}
    Items: ${itemDetails}`;

    const mailOptions = {
      from: 'seelaz.info@gmail.com',
      to: email,
      subject: 'Order Placed',
      text: `Your order has been placed successfully:\n\n${orderDetails}`,
    };

    const mailOptions2 = {
      from: 'seelaz.info@gmail.com',
      to: 'seelaz.info@gmail.com',
      subject: 'Order Received',
      text: `You received an order:\n\n${orderDetails}`,
    };

    // Send emails
    await this.transporter.sendMail(mailOptions);
    await this.transporter.sendMail(mailOptions2);

    // Delete the cart after successful order placement
    await this.cartService.deleteCartByUserId(userId);

    return order;
  }

  private addRemainingAmount(order: OrderDocument): any {
    const orderObj = order.toObject();
    const remainingAmount = orderObj.total - orderObj.downpayment;

    // Calculate days left for rental orders
    let daysLeft = null;
    if (orderObj.items.some(item => item.type === 'Rent') && orderObj.startDate && orderObj.endDate) {
      const currentDate = new Date(orderObj.startDate);
      const endDate = new Date(orderObj.endDate);
      const timeDiff = endDate.getTime() - currentDate.getTime();
      daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
    }

    return {
      ...orderObj,
      remainingAmount,
      daysLeft
    };
  }

  async getMyOrders(): Promise<any[]> {
    const userId = this.getCurrentUserId();
    const orders = await this.orderModel.find({  userId, 
     });
    return orders;
  }

  async getMyRentOrders(): Promise<any[]> {
    const userId = this.getCurrentUserId();
    const rentOrders = await this.orderModel.find({
      userId,
      'items.type': 'Rent'
    }).exec();
    return rentOrders.map(order => this.addRemainingAmount(order));
  }

  async getMyPurchaseOrders(): Promise<any[]> {
    const userId = this.getCurrentUserId();
    const purchaseOrders = await this.orderModel.find({
      userId,
      'items.type': 'purchase'
    }).exec();
    return purchaseOrders;
  }
}