import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'], // Update with your broker address
      },
      consumer: {
        groupId: 'product-consumer' // Ensure this is unique per service
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
