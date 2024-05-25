import { Controller, Post, Body, Get, Param, Logger } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentRequestDTO } from './dto/payment-request.dto';
import { PaymentKeyResponseDTO } from './dto/payment-key-response.dto';
import { EventPattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { UserSingleton } from './userSingleton';

@Controller('payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

  constructor(private readonly paymentService: PaymentService) {}

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

  @EventPattern('cart.details')
  async handleCartDetails(@Payload() message: any, @Ctx() context: KafkaContext) {
    const topic = context.getTopic();
    this.logger.log(`Received message from topic: ${topic}`);
    await this.paymentService.handleCartDetails(message.value);
  }

  @Post('checkout')
  async checkout(@Body() paymentRequestDTO: PaymentRequestDTO): Promise<{ iframeUrl: string } | undefined> {
    const iframeUrl = await this.paymentService.pay(paymentRequestDTO);
    if (iframeUrl) {
      return { iframeUrl };
    }
    return undefined;
  }

  @Get('get-transaction/:id')
  async getTransactionById(@Param('id') transactionId: string): Promise<PaymentKeyResponseDTO | undefined> {
    return this.paymentService.getTransactionById(transactionId);
  }
}
