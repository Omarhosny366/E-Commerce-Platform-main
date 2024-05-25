import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'payment',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'payment-consumer',
          },
        },
      },
    ]),
  ],
  providers: [PaymentService],
})
export class PaymentModule {}
