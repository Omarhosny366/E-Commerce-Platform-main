import { Controller, Post, Body, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentRequestDTO } from './dto/payment-request.dto';
import { PaymentKeyResponseDTO } from './dto/payment-key-response.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout')
  async checkout(@Body() paymentRequestDTO: PaymentRequestDTO): Promise<string | undefined> {
    return this.paymentService.pay(paymentRequestDTO);
  }

  @Get('get-transaction/:id')
  async getTransactionById(transactionId: string): Promise<PaymentKeyResponseDTO | undefined> {
    return this.paymentService.getTransactionById(transactionId);
  }
  
}
