import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'cart-consumer',
      },
    },
  });
  app.use(cors()); // Enable CORS for all routes
  await app.startAllMicroservices();
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
