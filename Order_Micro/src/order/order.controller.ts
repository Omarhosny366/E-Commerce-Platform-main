import { Controller, Post, Body,Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDocument } from './schema/order.schema';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  async placeOrder(@Body() body: { addressId: string }) {
    try {
      const order = await this.orderService.placeOrder(body.addressId);
      return { success: true, order };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  @Get('')
  async getMyOrders(): Promise<OrderDocument[]> {
    return this.orderService.getMyOrders();
  }
  @Get('my-rents')
  async getMyRentOrders(): Promise<OrderDocument[]> {
      return this.orderService.getMyRentOrders();
  }

  @Get('my-orders')
  async getMyPurchaseOrders(): Promise<OrderDocument[]> {
      return this.orderService.getMyPurchaseOrders();
  }

  @Get('productQuantity')
  async getProductQuantity(@Body() body: { userId: string, productId: string }): Promise<any> {
    return this.orderService.getProductQuantity(body.userId, body.productId);
  }

  @Post('update-quanity')
  async updateProductQuantity(@Body() body: { userId: string, productId: string, quantity: number }) {
    return this.orderService.updateItemQuantity(body.userId, body.productId, body.quantity);
  }
}