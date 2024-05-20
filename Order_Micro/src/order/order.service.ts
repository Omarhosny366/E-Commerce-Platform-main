import { Inject, Injectable } from '@nestjs/common';
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

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('get.address');
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

  private getCurrentUserEmail(): string {
    const userSingleton = UserSingleton.getInstance();
    const currentUser = userSingleton.getCurrentUser();
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

  async placeOrder(addressId: string): Promise<OrderDocument> {
    const userId = this.getCurrentUserId();
    const email = this.getCurrentUserEmail();
    const address = await this.getAddressDetails(addressId);
    const cart = await this.cartService.getCartByUserId(userId);

    // Extract startDate and endDate from the cart items
    const startDate = cart.startDate;
    const endDate = cart.endDate;

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
    const orders = await this.orderModel.find({ userId }).exec();
    return orders.map(order => this.addRemainingAmount(order));
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
      'items.type': 'Purchase'
    }).exec();
    return purchaseOrders;
  }
}
