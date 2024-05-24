import { Controller, Post, Body, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentRequestDTO } from './dto/payment-request.dto';
import { PaymentKeyResponseDTO } from './dto/payment-key-response.dto';
import { OrderItemDTO } from './dto/create-order.dto';
import { OrderResponseDTO } from './dto/order-response.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout')
  async checkout(@Body() paymentRequestDTO: PaymentRequestDTO): Promise<{ iframeUrl: string } | undefined> {
    const iframeUrl = await this.paymentService.pay(paymentRequestDTO);
    if (iframeUrl) {
      return { iframeUrl };
    }
    return undefined;
  }

  @Get('get-transaction/:id')
  async getTransactionById(transactionId: string): Promise<PaymentKeyResponseDTO | undefined> {
    return this.paymentService.getTransactionById(transactionId);
  }

  // @Get('get-order-status/:transactionId')
  // async getOrderStatusByTransactionId(transactionId: string): Promise<OrderResponseDTO | undefined> {
  //   return this.paymentService.getOrderStatusByTransactionId(transactionId);
  // }
}
